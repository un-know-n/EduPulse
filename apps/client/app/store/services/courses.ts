import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  coursePrefix,
  enrollmentPrefix,
  lecturePrefix,
  sectionPrefix,
} from '../../config/routing/routes';
import {
  TCategoriesResponse,
  TCertificateResponse,
  TCourseResponse,
  TCourseWithAuthorResponse,
  TEnrollment,
  TEnrollmentResponse,
} from '../../components/course/@types/course';
import { RootState } from '../store';
import { objectToFormData } from '../../lib/utils/objectToFormData';
import { TSearchParams } from '../../lib/hooks/useSearch';

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
const enrollmentTag = 'Enrollments';

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [courseTag, enrollmentTag],
  endpoints: (builder) => ({
    getCourseById: builder.query<TCourseResponse, string>({
      query: (id) => `${coursePrefix}/${id}`,
      providesTags: [courseTag],
    }),
    getCourses: builder.query<
      { data: TCourseWithAuthorResponse[]; total: number },
      TSearchParams
    >({
      query: ({ orderBy, title, categoryIds, difficultyLevels, limit, page }) =>
        `${coursePrefix}/search?title=${title ?? ''}&orderBy=${
          orderBy ?? ''
        }&difficultyLevels=${
          difficultyLevels?.length ? difficultyLevels.join(',') : ''
        }&categoryIds=${
          categoryIds?.length ? categoryIds.join(',') : ''
        }&limit=${limit ?? ''}&page=${page ?? ''}`,
      providesTags: [courseTag],
    }),
    getCreatedCourses: builder.query<TCourseWithAuthorResponse[], null>({
      query: () => `${coursePrefix}/created`,
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
        body: { title },
      }),
      invalidatesTags: [courseTag],
    }),
    updateSection: builder.mutation<
      TCourseResponse,
      Omit<TCreateSection, 'courseId'> & { id: string }
    >({
      query: ({ id, title }) => {
        return {
          url: `${sectionPrefix}/${id}`,
          method: 'PATCH',
          body: { title },
        };
      },
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
      Omit<TCreateLecture, 'sectionId'> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `${lecturePrefix}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [courseTag],
    }),
    removeCourse: builder.mutation<TCourseResponse, string>({
      query: (id) => ({
        url: `${coursePrefix}/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: [courseTag],
    }),
    removeSection: builder.mutation<TCourseResponse, string>({
      query: (id) => ({
        url: `${sectionPrefix}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [courseTag],
    }),
    removeLecture: builder.mutation<TCourseResponse, string>({
      query: (id) => ({
        url: `${lecturePrefix}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [courseTag],
    }),
    getEnrollmentsById: builder.query<TEnrollmentResponse[], string>({
      query: (id) => `${enrollmentPrefix}/${id}`,
      providesTags: [enrollmentTag],
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
      invalidatesTags: [courseTag, enrollmentTag],
    }),
    resetEnrollment: builder.mutation<TEnrollment, string>({
      query: (id) => ({
        url: `${enrollmentPrefix}/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: [courseTag, enrollmentTag],
    }),
    getAllCategories: builder.query<TCategoriesResponse[], null>({
      query: () => `${coursePrefix}/categories`,
    }),
    getCertificates: builder.query<TCertificateResponse[], string>({
      query: (id) => `${enrollmentPrefix}/certificates/${id}`,
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useGetCertificatesQuery,
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
  useRemoveCourseMutation,
  useGetEnrollmentsByIdQuery,
  useGetCoursesQuery,
  useLazyGetCoursesQuery,
  useLazyGetCreatedCoursesQuery,
  useGetCreatedCoursesQuery,
} = coursesApi;
