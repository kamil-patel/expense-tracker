import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    //get Categories
    getCategories: builder.query({
      //get: 'http://localhost:808/api/categories'
      query: () => "/categories",
      providesTags: ["categories"],
    }),
    //get Labels
    getLabels: builder.query({
      //get: 'http://localhost:808/api/labels'
      query: () => "/labels",
      providesTags: ["transaction"],
    }),
    //add new Transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        //post: 'http://localhost:808/api/transaction'
        url: "/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),
    //delete Transaction
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        //delete: 'http://localhost:808/api/transaction'
        url: "/transaction",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export default apiSlice;
