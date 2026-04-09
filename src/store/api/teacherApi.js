// src/store/api/teacherApi.js

import { baseApi } from "./baseApi";

export const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: (params) => ({
        url: "/teachers",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          search: params?.search || "",
          department: params?.department || "",
          status: params?.status || "",
        },
      }),
      providesTags: ["Teachers"],
    }),
    getTeacherById: builder.query({
      query: (id) => `/teachers/${id}`,
      providesTags: (result, error, id) => [{ type: "Teachers", id }],
    }),
    createTeacher: builder.mutation({
      query: (data) => ({
        url: "/teachers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teachers"],
    }),
    updateTeacher: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/teachers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Teachers", id }],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teachers"],
    }),
    getTeacherDepartments: builder.query({
      query: () => "/teachers/departments",
      providesTags: ["Teachers"],
    }),
    getTeacherDesignations: builder.query({
      query: () => "/teachers/designations",
      providesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherByIdQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
  useGetTeacherDepartmentsQuery,
  useGetTeacherDesignationsQuery,
} = teacherApi;
