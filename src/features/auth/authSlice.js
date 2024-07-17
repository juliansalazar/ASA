import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Obtenemos del localStorage los datos del usuario
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Función para manejar mensajes de error
const getErrorMessage = (error) => {
    return (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
}

// Registrar un nuevo usuario
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
})

// Logear un usuario
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        const userData = await authService.login(user)
        localStorage.setItem('user', JSON.stringify(userData))
        return userData
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error))
    }
})

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
    localStorage.removeItem('user')
})

export const authSlice = createSlice({
    name: 'auth',
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
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.message = ''
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer