// src/store/api/parentApi.js

import { baseApi } from "./baseApi";

export const parentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChildData: builder.query({
      query: (parentId) => `/parents/${parentId}/child`,
      providesTags: ["Parents"],
    }),
    getChildAttendance: builder.query({
      query: ({ childId, month }) =>
        `/attendance/child/${childId}?month=${month}`,
    }),
    getChildFees: builder.query({
      query: (childId) => `/fees/statement/${childId}`,
    }),
    getChildResults: builder.query({
      query: (childId) => `/exams/results/${childId}`,
    }),
  }),
});

export const {
  useGetChildDataQuery,
  useGetChildAttendanceQuery,
  useGetChildFeesQuery,
  useGetChildResultsQuery,
} = parentApi;
