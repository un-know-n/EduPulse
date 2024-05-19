import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  coursePrefix,
  enrollmentPrefix,
  lecturePrefix,
  sectionPrefix,
} from '../../config/routing/routes';
import {
  TCourseResponse,
  TCourseWithAuthorResponse,
  TEnrollment,
  TEnrollmentResponse,
  TUserResponse,
} from '../../components/course/@types/course';
import { RootState } from '../store';
import { objectToFormData } from '../../lib/utils/objectToFormData';
import { TSearchParams } from '../../lib/hooks/useSearch';

const userTag = 'User';

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: [userTag],
  endpoints: (builder) => ({
    updateProfile: builder.mutation<
      TUserResponse,
      { id: string; name: string; description: string; file?: File }
    >({
      query: ({ id, file, ...body }) => {
        const formData = objectToFormData(body);
        if (file) formData.append('file', file);

        return {
          url: `/user/profile/${id}`,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: [userTag],
    }),
  }),
});

export const { useUpdateProfileMutation } = userApi;
