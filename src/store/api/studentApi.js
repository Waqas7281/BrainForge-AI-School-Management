// src/store/api/studentApi.js
import { baseApi } from "./baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all students (with filters)
    getStudents: builder.query({
      query: (params) => ({
        url: "/students",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          search: params?.search || "",
          class: params?.class || "",
          section: params?.section || "",
          status: params?.status || "",
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Students", id })),
              { type: "Students", id: "LIST" },
            ]
          : [{ type: "Students", id: "LIST" }],
    }),

    // Get single student
    getStudentById: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: (result, error, id) => [{ type: "Students", id }],
    }),

    // Create student
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/students",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Students", id: "LIST" }],
    }),

    // Update student
    updateStudent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Students", id },
        { type: "Students", id: "LIST" },
      ],
    }),

    // Delete student
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Students", id: "LIST" }],
    }),

    // Bulk import students
    bulkImportStudents: builder.mutation({
      query: (data) => ({
        url: "/students/bulk-import",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Students", id: "LIST" }],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useBulkImportStudentsMutation,
} = studentApi;
