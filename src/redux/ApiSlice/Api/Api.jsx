import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://geninv-backend.onrender.com/api",
  }),
  tagTypes: ["Customer", "Invoices"],
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (formData) => ({
        url: "/customers",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Customer"],
    }),
    getCustomers: builder.query({
      query: () => "/customers",
      providesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"], // Освежава коментаре после брисања
    }),
    createInvoice: builder.mutation({
      query: (formData) => ({
        url: "/invoices",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Invoices"],
    }),
    getInvNum: builder.query({
      query: () => "/invoices/next-number",
      providesTags: ["Invoices"],
    }),
    getAllInvoices: builder.query({
      query: () => "/invoices",
      providesTags: ["Invoices"],
    }),
    deleteInvoicer: builder.mutation({
      query: (id) => ({
        url: `/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoices"], // Освежава коментаре после брисања
    }),
    getInvoiceById: builder.query({
      query: (id) => `/invoices/${id}`,
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useCreateInvoiceMutation,
  useGetCustomersQuery,
  useDeleteCustomerMutation,
  useGetInvNumQuery,
  useGetAllInvoicesQuery,
  useDeleteInvoicerMutation,
  useLazyGetInvoiceByIdQuery,
} = apiSlice;
