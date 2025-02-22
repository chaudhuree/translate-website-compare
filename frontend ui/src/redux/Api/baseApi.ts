import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
});

export default baseApi;
