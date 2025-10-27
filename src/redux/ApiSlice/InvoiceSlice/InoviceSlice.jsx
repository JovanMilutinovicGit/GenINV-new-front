import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    customer_id: null,
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      // Traži postojeći artikal sa istim imenom i jedinicom
      const existingItem = state.items.find(
        (item) =>
          item.article_name === newItem.article_name &&
          item.unit === newItem.unit
      );

      if (existingItem) {
        // Povećaj quantity
        existingItem.quantity += newItem.quantity;
        // Ažuriraj total
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        // Dodaj total polje prilikom dodavanja novog artikla
        state.items.push({
          ...newItem,
          total: newItem.quantity * newItem.price,
        });
      }
    },
    removeItem: (state, action) => {
      const { article_name, unit } = action.payload;

      // Uklanja samo stavku koja ima istu jedinicu i ime
      state.items = state.items.filter(
        (item) => !(item.article_name === article_name && item.unit === unit)
      );
    },
    reset: (state) => {
      // Resetuje sve
      state.customer_id = null;
      state.items = [];
    },
    setCustomer: (state, action) => {
      state.customer_id = action.payload;
    },
  },
});

// export akcija
export const { addItem, removeItem, reset, setCustomer } = invoiceSlice.actions;

// export reducera
export default invoiceSlice.reducer;

// selector
export const selectInvoiceItems = (state) => state.invoice;
