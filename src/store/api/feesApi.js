// src/store/api/feesApi.js
import { baseApi } from "./baseApi";

export const feesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get fees groups
    getFeesGroups: builder.query({
      query: () => "/fees/groups",
      providesTags: ["Fees"],
    }),

    // Get fees types
    getFeesTypes: builder.query({
      query: () => "/fees/types",
      providesTags: ["Fees"],
    }),

    // Get fees master (class-wise fees)
    getFeesMaster: builder.query({
      query: (params) => ({
        url: "/fees/master",
        params,
      }),
      providesTags: ["Fees"],
    }),

    // Collect fees
    collectFees: builder.mutation({
      query: (data) => ({
        url: "/fees/collect",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Fees"],
    }),

    // Get student fees statement
    getStudentFeesStatement: builder.query({
      query: (studentId) => `/fees/statement/${studentId}`,
      providesTags: ["Fees"],
    }),

    // Get due fees
    getDueFees: builder.query({
      query: (params) => ({
        url: "/fees/due",
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
  useCollectFeesMutation,
  useGetStudentFeesStatementQuery,
  useGetDueFeesQuery,
} = feesApi;
