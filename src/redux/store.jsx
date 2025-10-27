import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./ApiSlice/InvoiceSlice/InoviceSlice";
import { apiSlice } from "./ApiSlice/Api/Api";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    invoice: invoiceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
