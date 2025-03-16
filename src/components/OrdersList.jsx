import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../styles/OrdersList.css';
import Navbar from './Navbar'

const OrdersList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('2025-03-01'); // Fecha predeterminada
  const [endDate, setEndDate] = useState(''); // Fecha final opcional

  const apiKey = import.meta.env.VITE_KEY_CONTIFICO || 'PJF858JmAbTrOBu8quv0IPaRPAQX5nbns9fsJxni4TI';

  // Función para formatear la fecha al formato DD/MM/YYYY requerido por Contifico
  const formatDateForApi = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  // Validar que la fecha inicial no sea mayor que la final
  const validateDates = () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return 'La fecha inicial no puede ser mayor que la fecha final';
    }
    return null;
  };

  // Fetch de prefacturas desde el endpoint de Contifico
  const fetchInvoices = async () => {
    const dateError = validateDates();
    if (dateError) {
      setError(dateError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let url = 'https://api.contifico.com/sistema/api/v1/documento/?tipo_documento=PRE';
      if (startDate) url += `&fecha_inicial=${encodeURIComponent(formatDateForApi(startDate))}`;
      if (endDate) url += `&fecha_final=${encodeURIComponent(formatDateForApi(endDate))}`;

      const response = await fetch(url, {
        headers: {
          Authorization: apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const filtered = Array.isArray(data)
        ? data.filter((invoice) => invoice.tipo_documento === 'PRE' && invoice.estado === 'P')
        : [];
      setInvoices(filtered);
    } catch (err) {
      setError(`Error al cargar las prefacturas: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleFilter = () => {
    fetchInvoices();
  };

  const downloadPDF = () => {
    if (invoices.length === 0) {
      alert('No hay prefacturas pendientes para descargar');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Lista de Prefacturas Pendientes', 14, 20);

    doc.setFontSize(12);
    const dateText = startDate && endDate
      ? `Período: ${formatDateForApi(startDate)} - ${formatDateForApi(endDate)}`
      : `Desde: ${formatDateForApi(startDate)}`;
    doc.text(dateText, 14, 30);

    const tableData = invoices.map((invoice) => [
      invoice.fecha_emision || '-',
      invoice.descripcion || '-',
      invoice.persona?.nombre_comercial || '-', // Nueva columna para nombre_comercial
      invoice.detalles && invoice.detalles.length > 0
        ? invoice.detalles.map((detalle) => detalle.producto_nombre || '-').join(', ')
        : '-',
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['Fecha', 'Descripción', 'Cliente', 'Productos']], // Agregar "Cliente"
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [66, 66, 66] },
      styles: { fontSize: 10 },
    });

    doc.save(`Prefacturas_Pendientes_${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '')}.pdf`);
  };

  if (loading) return <div>Cargando prefacturas pendientes...</div>;

  return (
    <>
    <Navbar/>
    <div className="invoice-list-container">
      <h2>Lista de Prefacturas Pendientes</h2>

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
        <p>No se encontraron prefacturas pendientes para el período seleccionado.</p>
      ) : (
        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Cliente</th> {/* Nueva columna para nombre_comercial */}
                <th>Productos</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.fecha_emision || '-'}</td>
                  <td>{invoice.descripcion || '-'}</td>
                  <td>{invoice.persona?.nombre_comercial || '-'}</td> {/* Mostrar nombre_comercial */}
                  <td>
                    {invoice.detalles && invoice.detalles.length > 0
                      ? invoice.detalles.map((detalle) => detalle.producto_nombre || '-').join(', ')
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default OrdersList;