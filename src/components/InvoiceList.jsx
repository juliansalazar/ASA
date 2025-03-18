import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../styles/InvoiceList.css';
import { useSelector } from 'react-redux';

const InvoiceList = () => {
  const { user } = useSelector((state) => state.auth);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('2025-01-01'); // Fecha predeterminada: 01/01/2025
  const [endDate, setEndDate] = useState(''); // Dejamos endDate vacío para traer hasta la fecha actual
  const [clientId, setClientId] = useState(null); // Estado para el clientId dinámico

  // Depuración del usuario
  useEffect(() => {
    console.log('Usuario desde Redux:', user);
  }, [user]);

  // Función para formatear la fecha
  const formatDateForApi = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  // Validar fechas
  const validateDates = () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return 'La fecha inicial no puede ser mayor que la fecha final';
    }
    return null;
  };

  // Obtener el clientId del usuario autenticado a través del backend
  const fetchClientId = async () => {
    console.log('Intentando obtener clientId para:', user?.identificacion);

    if (!user?.identificacion) {
      setError('El usuario no tiene una identificación válida');
      console.log('Error: No hay identificación en user');
      return;
    }

    const tipoIdentificacion = user.identificacion.length === 13 ? 'ruc' : user.identificacion.length === 10 ? 'cedula' : null;
    if (!tipoIdentificacion) {
      setError('La identificación no es válida');
      console.log('Error: Tipo de identificación no válido');
      return;
    }

    try {
      const response = await fetch(
        `/contifico/client-id?identificacion=${user.identificacion}&tipo=${tipoIdentificacion}`
      );
      console.log('Respuesta del servidor:', response.status, response.statusText);

      const data = await response.json();
      console.log('Datos recibidos:', data);

      if (data.error) {
        setError(data.error);
        console.log('Error desde el backend:', data.error);
      } else if (data.id) {
        setClientId(data.id);
        console.log('ClientId establecido:', data.id);
      } else {
        setError('Respuesta inesperada del servidor');
        console.log('Respuesta inesperada:', data);
      }
    } catch (error) {
      setError('Error al obtener el ID del cliente: ' + error.message);
      console.log('Error en fetch:', error);
    }
  };

  // Fetch de facturas a través del backend
  const fetchInvoices = async () => {
    if (!clientId) {
      setError('No se proporcionó un ID de cliente');
      console.log('Error: No hay clientId');
      return;
    }

    const dateError = validateDates();
    if (dateError) {
      setError(dateError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let url = `/contifico/invoices?persona_id=${clientId}&tipo_documento=FAC`;
      if (startDate) url += `&startDate=${encodeURIComponent(formatDateForApi(startDate))}`;
      if (endDate) url += `&endDate=${encodeURIComponent(formatDateForApi(endDate))}`;

      const response = await fetch(url);
      console.log('Respuesta de facturas:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const filtered = Array.isArray(data) ? data.filter((invoice) => invoice.tipo_documento === 'FAC') : [];
      setInvoices(filtered);
    } catch (err) {
      setError(`Error al cargar las facturas: ${err.message}`);
      console.log('Error en fetch de facturas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar el clientId al montar el componente y luego fetchInvoices automáticamente
  useEffect(() => {
    fetchClientId();
  }, []);

  // Ejecutar fetchInvoices automáticamente cuando cambie clientId
  useEffect(() => {
    if (clientId) {
      fetchInvoices();
    }
  }, [clientId]); // Dependencia en clientId para que se ejecute después de obtenerlo

  const handleFilter = () => {
    fetchInvoices();
  };

  // Descargar PDF
  const downloadPDF = () => {
    if (invoices.length === 0) {
      alert('No hay facturas para descargar');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Historia del Cliente', 14, 20);

    doc.setFontSize(12);
    const dateText = startDate && endDate
      ? `Período: ${formatDateForApi(startDate)} - ${formatDateForApi(endDate)}`
      : `Desde: ${formatDateForApi(startDate)}`;
    doc.text(dateText, 14, 30);

    const tableData = invoices.map((invoice) => [
      invoice.fecha_emision,
      invoice.documento,
      invoice.referencia || '-',
      invoice.descripcion || '-',
      `$${parseFloat(invoice.total).toFixed(2)}`,
      invoice.estado === 'P' ? 'Pendiente' : invoice.estado === 'C' ? 'Cancelado' : invoice.estado === 'A' ? 'Anulado' : invoice.estado,
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['Fecha', 'Documento No.', 'Placa', 'Descripción', 'Total', 'Estado']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [66, 66, 66] },
      styles: { fontSize: 10 },
    });

    doc.save(`Facturas_${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '')}.pdf`);
  };

  if (loading) return <div>Cargando facturas...</div>;
  if (!clientId) return <div>Cargando información del cliente...</div>;

  return (
    <div className="invoice-list-container">
      <h2>Historia del Cliente</h2>

      <div className="filter-container">
        <div className="filter-group">
          <label>Fecha Inicial:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Fecha Final:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          className="refresh-button"
          onClick={handleFilter}
          disabled={loading}
        >
          {loading ? 'Filtrando...' : 'Filtrar'}
        </button>
        <button
          className="download-button"
          onClick={downloadPDF}
          disabled={loading || invoices.length === 0}
        >
          Descargar PDF
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {invoices.length === 0 && !error ? (
        <p>No se encontraron facturas para el período seleccionado.</p>
      ) : (
        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Documento No.</th>
                <th>Placa</th>
                <th>Descripción</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.fecha_emision}</td>
                  <td>{invoice.documento}</td>
                  <td>{invoice.referencia || '-'}</td>
                  <td>{invoice.descripcion || '-'}</td>
                  <td>${parseFloat(invoice.total).toFixed(2)}</td>
                  <td>
                    {invoice.estado === 'P'
                      ? 'Pendiente'
                      : invoice.estado === 'C'
                      ? 'Cancelado'
                      : invoice.estado === 'A'
                      ? 'Anulado'
                      : invoice.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;