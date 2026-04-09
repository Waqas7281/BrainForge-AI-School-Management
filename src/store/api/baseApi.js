import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      const schoolId = getState().auth.schoolId;
      if (schoolId) {
        headers.set("x-school-id", schoolId);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "Students",
    "Teachers",
    "Staff",
    "Classes",
    "Subjects",
    "Fees",
    "Attendance",
    "Exams",
    "Results",
    "Schools",
    "Users",
  ],
  endpoints: () => ({}),
});
