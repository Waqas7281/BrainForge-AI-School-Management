// src/store/api/baseApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../slices/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // For HttpOnly cookies
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
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 Unauthorized
  if (result.error && result.error.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // Store new token
      api.dispatch(setCredentials({ token: refreshResult.data.token }));
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed - logout
      api.dispatch(logout());
      window.location.href = "/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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
