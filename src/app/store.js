import { configureStore } from '@reduxjs/toolkit'
import  authReducer from '../features/auth/authSlice'
import placaReducer from '../features/placas/placaSlice'
import productsReducer from '../features/products/productSlice'
import loyaltyReducer from '../features/loyalty/loyaltySlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        placa: placaReducer,
        products: productsReducer,
        loyalty: loyaltyReducer,
    },
})

export default store;