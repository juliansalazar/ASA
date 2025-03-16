// src/features/loyalty/loyaltySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getLoyaltyPoints,
  updateLoyaltyPoints,
  syncContificoLoyalty,
  redeemLoyaltyPoints,
} from './loyaltyService';

// Thunks para manejar las acciones asíncronas
export const fetchLoyaltyPoints = createAsyncThunk(
  'loyalty/fetchLoyaltyPoints',
  async (identificacion, { rejectWithValue }) => {
    try {
      if (!identificacion) {
        return rejectWithValue('Identificación no proporcionada');
      }
      const data = await getLoyaltyPoints(identificacion);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching points');
    }
  }
);

export const updatePoints = createAsyncThunk(
  'loyalty/updatePoints',
  async ({ identificacion, points }, { rejectWithValue }) => {
    try {
      if (!identificacion) {
        return rejectWithValue('Identificación no proporcionada');
      }
      const data = await updateLoyaltyPoints(identificacion, points);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error updating points');
    }
  }
);

export const syncContifico = createAsyncThunk(
  'loyalty/syncContifico',
  async ({ identificacion, tipoIdentificacion }, { rejectWithValue }) => {
    try {
      if (!identificacion || !tipoIdentificacion) {
        return rejectWithValue('Faltan identificación o tipo de identificación');
      }
      const data = await syncContificoLoyalty(identificacion, tipoIdentificacion);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error syncing with Contifico');
    }
  }
);

export const redeemPoints = createAsyncThunk(
  'loyalty/redeemPoints',
  async ({ identificacion, pointsToRedeem }, { rejectWithValue }) => {
    try {
      if (!identificacion) {
        return rejectWithValue('Identificación no proporcionada');
      }
      const data = await redeemLoyaltyPoints(identificacion, pointsToRedeem);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error redeeming points');
    }
  }
);

// Slice de Redux
const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState: {
    points: 0,
    history: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetLoyaltyState: (state) => {
      state.points = 0;
      state.history = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch points
    builder
      .addCase(fetchLoyaltyPoints.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLoyaltyPoints.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.points = action.payload.points || 0;
        state.history = action.payload.history || [];
      })
      .addCase(fetchLoyaltyPoints.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update points
      .addCase(updatePoints.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePoints.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.points = action.payload.points || 0;
        state.history = action.payload.history || [];
      })
      .addCase(updatePoints.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Sync Contifico
      .addCase(syncContifico.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(syncContifico.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.points = action.payload.points || 0;
        state.history = action.payload.history || [];
      })
      .addCase(syncContifico.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Redeem points
      .addCase(redeemPoints.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(redeemPoints.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.points = action.payload.points || 0;
        state.history = action.payload.history || [];
      })
      .addCase(redeemPoints.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetLoyaltyState } = loyaltySlice.actions;
export default loyaltySlice.reducer;