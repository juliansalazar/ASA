import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../styles/InvoiceList.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContificoClientId } from '../features/auth/authSlice';
import PuntosCliente from './PuntosCliente';

const ContificoId = () => {

  const { user, clientId, isLoadingClientId, errorClientId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.APP_VITE_CONTIFICO

  // Obtener clientId al montar el componente
  useEffect(() => {
    if (!clientId && user?.identificacion) {
      dispatch(fetchContificoClientId(user.identificacion));
    }
  }, [clientId, user, dispatch]);
  
  const fetchInvoices = async () => {
    if (!clientId) {
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

      let url = `https://api.contifico.com/sistema/api/v1/documento/?persona_id=${clientId}&tipo_documento=FAC`;

      const response = await fetch(url, {
        headers: {
          Authorization: apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
    } catch (err) {
      setError(`Error al cargar las facturas: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <p>Hello world ${clientId}</p>
      <PuntosCliente clienteId={clientId} />
    
    </>
  );
};

export default ContificoId;