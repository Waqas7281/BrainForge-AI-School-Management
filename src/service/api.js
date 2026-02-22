import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";


export const api = createApi({
  reducerPath:'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query:(data)=>({
        url:'/user/register',
        method:'POST',
        body:data
      })
    }),
  }),
});

export const {useLoginMutation} = api;