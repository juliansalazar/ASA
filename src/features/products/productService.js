import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products/'

//Crear producto

const crearProducto = async (productoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, productoData, config)
    return response.data
}

// Get products 

const getProducts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

//Delete Product

const deleteProduct = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

//Update Product

const updateProduct = async (id, productoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + id, productoData, config)
    return response.data
}

//Get Product by Product Name

const getProductByName = async (name, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + name, config)
    return response.data
}

const productService = {
    crearProducto,
    getProducts,
    deleteProduct,
    updateProduct,
    getProductByName
}

export default productService;