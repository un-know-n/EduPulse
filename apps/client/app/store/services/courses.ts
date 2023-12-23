import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { coursePrefix, enrollmentPrefix } from '../../config/routing/routes';
import {
  TCourseResponse,
  TEnrollment,
} from '../../components/course/@types/course';
import { RootState } from '../store';

const courseTag = 'Courses';

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [courseTag],
  endpoints: (builder) => ({
    getCourseById: builder.query<TCourseResponse, string>({
      query: (id) => `${coursePrefix}/${id}`,
      providesTags: [courseTag],
    }),
    addEnrollment: builder.mutation<
      TEnrollment,
      { userId: string; courseId: string }
    >({
      query: (body) => ({
        url: `${enrollmentPrefix}`,
        method: 'post',
        body,
      }),
      invalidatesTags: [courseTag],
    }),
    resetEnrollment: builder.mutation<TEnrollment, string>({
      query: (id) => ({
        url: `${enrollmentPrefix}/${id}`,
        method: 'patch',
      }),
      invalidatesTags: [courseTag],
    }),
  }),
});

export const {
  useGetCourseByIdQuery,
  useAddEnrollmentMutation,
  useLazyGetCourseByIdQuery,
  useResetEnrollmentMutation,
} = coursesApi;
