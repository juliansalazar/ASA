import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlaca } from '../features/placas/placaSlice';
import { toast } from 'react-toastify';

const DeletePlateButton = ({ placaId }) => {
    const dispatch = useDispatch();
    const { isLoading, isError, message } = useSelector((state) => state.placa);

    const handleDelete = () => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta placa?');

        if (!confirmDelete) return;

        dispatch(deletePlaca(placaId))
            .unwrap()
            .then(() => {
                toast.success('Placa eliminada exitosamente');
            })
            .catch((error) => {
                toast.error(`Error al eliminar la placa: ${error.message || message}`);
            });
    };

    return (
        <div className="delete-plate-container">
            <button
                className="delete-button"
                onClick={handleDelete}
                disabled={isLoading}
            >
                Eliminar placa
            </button>

            {isError && <p className="error-message">{message}</p>}
        </div>
    );
};

export default DeletePlateButton;
