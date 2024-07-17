import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import placaService from './placaService'

const initialState = {
    placas: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Crear una tarea
export const crearPlaca = createAsyncThunk('placas/crear', async (placaData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await placaService.crearPlaca(placaData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Obtener las tareas del usuario
export const getPlacas = createAsyncThunk('placas/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await placaService.getPlacas(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Borrar una tarea
export const deletePlaca = createAsyncThunk('placas/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await placaService.deletePlaca(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const placaSlice = createSlice({
    name: 'placa',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(crearPlaca.pending, (state) => {
                state.isLoading = true
            })
            .addCase(crearPlaca.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log(action)
                state.placas = [...state.placas, action.payload]
            })
            .addCase(crearPlaca.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPlacas.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPlacas.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.placas = action.payload
            })
            .addCase(getPlacas.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePlaca.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePlaca.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.placas = state.placas.filter((placa) => placa._id !== action.payload.id)
            })
            .addCase(deletePlaca.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = placaSlice.actions
export default placaSlice.reducer