// src/store/api/feesApi.js

import { baseApi } from "./baseApi";

export const feesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeesGroups: builder.query({
      query: () => "/fees/groups",
      providesTags: ["Fees"],
    }),
    getFeesTypes: builder.query({
      query: () => "/fees/types",
      providesTags: ["Fees"],
    }),
    getFeesMaster: builder.query({
      query: (params) => ({
        url: "/fees/master",
        params,
      }),
      providesTags: ["Fees"],
    }),
    getFeesReport: builder.query({
      query: (params) => ({
        url: "/fees/report",
        params,
      }),
      providesTags: ["Fees"],
    }),
    collectFees: builder.mutation({
      query: (data) => ({
        url: "/fees/collect",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Fees"],
    }),
    getStudentFeesStatement: builder.query({
      query: (studentId) => `/fees/statement/${studentId}`,
      providesTags: ["Fees"],
    }),
    getDueFees: builder.query({
      query: (params) => ({
        url: "/fees/due",
        params,
      }),
      providesTags: ["Fees"],
    }),
    searchFeePayment: builder.query({
      query: (params) => ({
        url: "/fees/search-payment",
        params,
      }),
      providesTags: ["Fees"],
    }),
  }),
});

export const {
  useGetFeesGroupsQuery,
  useGetFeesTypesQuery,
  useGetFeesMasterQuery,
  useGetFeesReportQuery,
  useCollectFeesMutation,
  useGetStudentFeesStatementQuery,
  useGetDueFeesQuery,
  useSearchFeePaymentQuery,
} = feesApi;
