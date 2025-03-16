import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Obtenemos del localStorage los datos del usuario
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? { _id: user._id, name: user.name, email: user.email, identificacion: user.identificacion, isAdmin: user.isAdmin } : null,
  token: user ? user.token : null,
  clientId: null, // Nuevo campo para el clientId de Contifico
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingClientId: false, // Indicador de carga específico para clientId
  errorClientId: null, // Error específico para clientId
  message: '',
};

// Función para manejar mensajes de error
const getErrorMessage = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

// Registrar un nuevo usuario
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// Logear un usuario
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const userData = await authService.login(user);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// Recuperar la contraseña
export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ email }, thunkAPI) => {
  try {
    return await authService.resetPassword(email);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
  localStorage.removeItem('user');
});

// Obtener el clientId desde Contifico
export const fetchContificoClientId = createAsyncThunk(
  'auth/fetchContificoClientId',
  async (identificacion, { rejectWithValue }) => {
    const apiKey = import.meta.env.VITE_KEY_CONTIFICO || 'PJF858JmAbTrOBu8quv0IPaRPAQX5nbns9fsJxni4TI';
    const tipoIdentificacion = identificacion.length === 13 ? 'ruc' : identificacion.length === 10 ? 'cedula' : null;

    if (!tipoIdentificacion) {
      return rejectWithValue('La identificación no es válida');
    }

    try {
      const response = await fetch(
        `https://api.contifico.com/sistema/api/v1/persona/?${tipoIdentificacion}=${identificacion}`,
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const userData = await response.json();
      if (userData.length > 0) {
        return userData[0].id; // Devolver el clientId
      } else {
        return rejectWithValue('No se encontró el ID del cliente en Contifico');
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    clearClientId: (state) => {
      state.clientId = null; // Para limpiar el clientId si es necesario
      state.isLoadingClientId = false;
      state.errorClientId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Registro
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Se ha enviado un enlace a tu correo electrónico para restablecer tu contraseña.';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.clientId = null; // Limpiar clientId al hacer logout
      })
      // Fetch Contifico ClientId
      .addCase(fetchContificoClientId.pending, (state) => {
        state.isLoadingClientId = true;
        state.errorClientId = null;
      })
      .addCase(fetchContificoClientId.fulfilled, (state, action) => {
        state.isLoadingClientId = false;
        state.clientId = action.payload;
      })
      .addCase(fetchContificoClientId.rejected, (state, action) => {
        state.isLoadingClientId = false;
        state.errorClientId = action.payload;
      });
  },
});

export const { reset, clearClientId } = authSlice.actions;
export default authSlice.reducer;