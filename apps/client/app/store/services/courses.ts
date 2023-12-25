import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  coursePrefix,
  enrollmentPrefix,
  lecturePrefix,
  sectionPrefix,
} from '../../config/routing/routes';
import {
  TCourseResponse,
  TEnrollment,
} from '../../components/course/@types/course';
import { RootState } from '../store';
import { objectToFormData } from '../../lib/utils/objectToFormData';

type TCreateCourse = {
  file?: File;
  title: string;
  description: string;
  purpose: string;
  timeToPass: number;
  difficultyLevel: number;
  creatorId: string;
};

type TCreateSection = {
  courseId: string;
  title: string;
};

type TCreateLecture = {
  sectionId: string;
  title: string;
  content: string;
};

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
    createCourse: builder.mutation<TCourseResponse, TCreateCourse>({
      query: ({ file, ...body }) => {
        const formData = objectToFormData(body);
        if (file) formData.append('file', file);

        return {
          url: `${coursePrefix}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    updateCourse: builder.mutation<
      TCourseResponse,
      Omit<TCreateCourse, 'creatorId'> & { id: string }
    >({
      query: ({ id, file, ...body }) => {
        const formData = objectToFormData(body);
        if (file) formData.append('file', file);

        return {
          url: `${coursePrefix}/${id}`,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: [courseTag],
    }),
    createSection: builder.mutation<TCourseResponse, TCreateSection>({
      query: ({ courseId, title }) => ({
        url: `${sectionPrefix}?courseId=${courseId}`,
        method: 'POST',
        body: title,
      }),
      invalidatesTags: [courseTag],
    }),
    updateSection: builder.mutation<
      TCourseResponse,
      TCreateSection & { id: string }
    >({
      query: ({ id, courseId, title }) => ({
        url: `${sectionPrefix}/${id}`,
        method: 'PATCH',
        body: title,
      }),
      invalidatesTags: [courseTag],
    }),
    createLecture: builder.mutation<TCourseResponse, TCreateLecture>({
      query: ({ sectionId, ...body }) => ({
        url: `${lecturePrefix}?sectionId=${sectionId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [courseTag],
    }),
    updateLecture: builder.mutation<
      TCourseResponse,
      TCreateLecture & { id: string }
    >({
      query: ({ id, sectionId, ...body }) => ({
        url: `${lecturePrefix}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [courseTag],
    }),
    removeSection: builder.mutation<TCourseResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${sectionPrefix}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [courseTag],
    }),
    removeLecture: builder.mutation<TCourseResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${lecturePrefix}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [courseTag],
    }),
    addEnrollment: builder.mutation<
      TEnrollment,
      { userId: string; courseId: string }
    >({
      query: (body) => ({
        url: `${enrollmentPrefix}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [courseTag],
    }),
    resetEnrollment: builder.mutation<TEnrollment, string>({
      query: (id) => ({
        url: `${enrollmentPrefix}/${id}`,
        method: 'PATCH',
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
  useCreateCourseMutation,
  useCreateLectureMutation,
  useCreateSectionMutation,
  useUpdateCourseMutation,
  useUpdateLectureMutation,
  useUpdateSectionMutation,
  useRemoveLectureMutation,
  useRemoveSectionMutation,
} = coursesApi;
