import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import { TCourseCommentResponse } from '../../components/course/@types/course';

// const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`); ///course-comments

type TCreateCourseComment = {
  text: string;
  userId: string;
  courseId: string;
};

// export const courseCommentsApi = createApi({
//   reducerPath: 'courseCommentsApi',
//   baseQuery: fakeBaseQuery(), //fetchBaseQuery({ baseUrl: '/' }),
//   endpoints: (builder) => ({
//     fetchComments: builder.query<
//       TCourseCommentResponse[],
//       { courseId: string; order: 'asc' | 'desc' }
//     >({
//       queryFn: ({ courseId, order }) => {
//         return new Promise((resolve) => {
//           socket.emit('findAllSortedCourseComments', courseId, order);
//           socket.on('commentsFound', (comments) => {
//             resolve({ data: comments });
//           });
//         });
//       },
//     }),
//     createComment: builder.mutation<
//       TCourseCommentResponse,
//       TCreateCourseComment
//     >({
//       query: (comment) => {
//         socket.emit('createCourseComment', comment);
//         return { data: comment };
//       },
//     }),
//   }),
// });

// socket.on('connect', () => {
//   console.log('connected to server');
// });

// socket.on('newMessage', (data) => {
//   courseCommentsApi.endpoints.fetchComments.invalidate(); // Обновляем данные RTK Query при получении новых сообщений
// });

// export const { useFetchCommentsQuery, useCreateCommentMutation } =
// courseCommentsApi;
