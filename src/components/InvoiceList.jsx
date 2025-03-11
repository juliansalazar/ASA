import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../styles/InvoiceList.css';
import { useSelector } from 'react-redux';

const InvoiceList = () => {
  const { user } = useSelector((state) => state.auth);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('');
  const [clientId, setClientId] = useState(null);

  const apiKey = import.meta.env.VITE_KEY_CONTIFICO;

  console.log('Estado completo de Redux auth:', useSelector((state) => state.auth));
  console.log('User desde Redux:', user);
  console.log('Todas las variables de entorno:', import.meta.env);
  console.log('VITE_KEY_CONTIFICO:', import.meta.env.VITE_KEY_CONTIFICO);

  const formatDateForApi = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const validateDates = () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return 'La fecha inicial no puede ser mayor que la fecha final';
    }
    return null;
  };

  const fetchClientId = async () => {
    console.log('fetchClientId ejecutado, user:', user);
    if (!user?.identificacion) {
      setError('El usuario no tiene una identificación válida');
      return null;
    }

    const tipoIdentificacion = user.identificacion.length === 13 ? 'ruc' : user.identificacion.length === 10 ? 'cedula' : null;
    if (!tipoIdentificacion) {
      setError('La identificación no es válida');
      return null;
    }

    console.log('API Key:', apiKey);
    try {
      const response = await fetch(
        `https://api.contifico.com/sistema/api/v1/persona/?${tipoIdentificacion}=${user.identificacion}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const userData = await response.json();
      if (userData.length > 0) {
        console.log('Client ID obtenido:', userData[0].id);
        return userData[0].id;
      } else {
        setError('No se encontró el ID del cliente');
        return null;
      }
    } catch (error) {
      setError(`Error al obtener el ID del cliente: ${error.message}`);
      console.error('Error en fetchClientId:', error);
      return null;
    }
  };

  const fetchInvoices = async (clientIdToUse) => {
    console.log('fetchInvoices ejecutado, clientId:', clientIdToUse);
    if (!clientIdToUse) {
      setError('No se proporcionó un ID de cliente');
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

      let url = `https://api.contifico.com/sistema/api/v1/documento/?persona_id=${clientIdToUse}&tipo_documento=FAC`;
      if (startDate) url += `&fecha_inicial=${encodeURIComponent(formatDateForApi(startDate))}`;
      if (endDate) url += `&fecha_final=${encodeURIComponent(formatDateForApi(endDate))}`;
      console.log('Fetching invoices from:', url);
      console.log('API Key:', apiKey);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const filtered = Array.isArray(data) ? data.filter((invoice) => invoice.tipo_documento === 'FAC') : [];
      setInvoices(filtered);
    } catch (err) {
      setError(`Error al cargar las facturas: ${err.message}`);
      console.error('Error en fetchInvoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const id = await fetchClientId();
      if (id) {
        setClientId(id);
        await fetchInvoices(id);
      } else {
        setLoading(false);
      }
    };
    loadData();
  }, [user?.identificacion]);

  const handleFilter = () => {
    fetchInvoices(clientId);
  };

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
  if (error) return <div className="error-message">{error}</div>;

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
        <button className="refresh-button" onClick={handleFilter} disabled={loading}>
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

      {invoices.length === 0 ? (
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