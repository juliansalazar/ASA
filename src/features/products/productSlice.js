import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../products/productService';

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create a new product

export const createProduct = createAsyncThunk('products/create', async (productData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.createProduct(productData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return {
            isError: true,
            message: message
        }
    }
})

// Get all products

export const getProducts = createAsyncThunk('products/get', async (token) => {
    try {
        return await productService.getProducts(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return {
            isError: true,
            message: message
        }
    }
})

// Delete a product

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.deleteProduct(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return {
            isError: true,
            message: message
        }
    }
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
           .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products.push(action.payload)
            })
           .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
           .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
           .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
    }
})

export const { reset } = productSlice.actions
export default productSlice.reducer