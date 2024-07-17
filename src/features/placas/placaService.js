import axios from 'axios'

const API_URL = 'http://localhost:8080/api/placas/'

//Crear Tarea
const crearPlaca = async (placaData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, placaData, config)
    return response.data
}

//Get Tarea
const getPlacas = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

//Delete Placa
const deletePlaca = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config)

    return response.data
}

const placaService = {
    crearPlaca,
    getPlacas,
    deletePlaca
}

export default placaService
