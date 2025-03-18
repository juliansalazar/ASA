import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchContificoClientId } from '../features/auth/authSlice';

function PuntosCliente() {
  const { clientId, user, isLoadingClientId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [totalCanceladas, setTotalCanceladas] = useState(0);
  const [loading, setLoading] = useState(false);

  // Obtener clientId si no está disponible
  useEffect(() => {
    if (!clientId && user?.identificacion) {
      dispatch(fetchContificoClientId(user.identificacion));
    }
  }, [clientId, user, dispatch]);

  // Fetch de facturas cuando clientId esté listo
  useEffect(() => {
    const fetchFacturasCanceladas = async () => {
      if (!clientId) {
        setError('ID de cliente no proporcionado');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.contifico.com/sistema/api/v1/documento/?persona_id=${clientId}&tipo_documento=FAC`,
          {
            headers: {
              Authorization: import.meta.env.VITE_CONTIFICO,
            },
          }
        );

        const facturas = response.data;
        // Filtrar facturas canceladas (estado "C") y de clientes (tipo_registro "CLI"), luego sumar sus totales
        const sumaCanceladas = facturas
          .filter((factura) => factura.estado === 'C' && factura.tipo_registro === 'CLI')
          .reduce((total, factura) => total + parseFloat(factura.total || 0), 0);

        setTotalCanceladas(sumaCanceladas * 0.3);
      } catch (err) {
        setError(`Hubo un error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchFacturasCanceladas();
    }
  }, [clientId]);

  return (
    <div>
      {isLoadingClientId && <p>Cargando ID del cliente...</p>}
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoadingClientId && !loading && !error && (
        <h4 style={{ marginBottom: '30px' }}>
          Millas disponibles:{' '}
          {Math.round(totalCanceladas).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </h4>
      )}
    </div>
  );
}

export default PuntosCliente;