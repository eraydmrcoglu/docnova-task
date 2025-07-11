import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  invoices: [],
  selectedInvoice: null,
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload
    },
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload
    },
  },
})

export const { setInvoices, setSelectedInvoice } = invoiceSlice.actions
export default invoiceSlice.reducer
