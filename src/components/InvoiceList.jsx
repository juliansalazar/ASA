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

  const apiKey = import.meta.env.VITE_CONTIFICO; // || 'abc123xyz'; // Descomenta y hardcodea temporalmente si sigue fallando

  console.log('Todas las variables de entorno:', import.meta.env);
  console.log('VITE_KEY_CONTIFICO:', import.meta.env.VITE_CONTIFICO);
  console.log('API Key final:', apiKey);
  if (!apiKey) {
    console.error('ERROR: VITE_CONTIFICO no está definida. Revisa tu .env (local) o Settings > Environment Variables (Vercel).');
    setError('La clave API no está configurada. Contacta al administrador.');
  }

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
  
    // Validar existencia y formato básico de user.identificacion
    if (!user || !user.identificacion || typeof user.identificacion !== 'string') {
      setError('El usuario no tiene una identificación válida o no está autenticado');
      return null;
    }
  
    console.log('Identificación del usuario:', user.identificacion);
  
    // Validar que la identificación sea solo números y tenga longitud válida
    const identificacion = user.identificacion.trim();
    if (!/^\d+$/.test(identificacion)) {
      setError('La identificación debe contener solo números');
      return null;
    }
  
    const tipoIdentificacion = identificacion.length === 13 ? 'ruc' : identificacion.length === 10 ? 'cedula' : null;
    if (!tipoIdentificacion) {
      setError(`La identificación debe tener 10 (cédula) o 13 (RUC) dígitos, pero tiene ${identificacion.length}`);
      return null;
    }
  
    console.log('API Key:', apiKey);
    if (!apiKey) {
      setError('La clave API no está configurada en el servidor');
      return null;
    }
  
    try {
      const url = `https://api.contifico.com/sistema/api/v1/persona/?${tipoIdentificacion}=${identificacion}`;
      console.log('Solicitando:', url);
  
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`, // Ajusta según la documentación de Contifico
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Intenta obtener más detalles del error
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
      }
  
      const userData = await response.json();
      console.log('Respuesta de la API:', userData);
  
      // Manejar diferentes formatos de respuesta
      if (Array.isArray(userData)) {
        if (userData.length > 0 && userData[0].id) {
          console.log('Client ID obtenido:', userData[0].id);
          return userData[0].id;
        } else {
          setError('No se encontró el ID del cliente en la respuesta');
          return null;
        }
      } else if (userData && userData.id) {
        // Si la API devuelve un objeto único
        console.log('Client ID obtenido:', userData.id);
        return userData.id;
      } else {
        setError('Formato de respuesta inesperado de la API');
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
          Authorization: apiKey, // Prueba sin "Bearer" primero
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