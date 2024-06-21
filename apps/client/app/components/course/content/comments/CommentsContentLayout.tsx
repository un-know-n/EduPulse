import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  Center,
  useColorModeValue,
  Box,
  IconButton,
  Flex,
  Text,
  Select,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../../../lib/hooks/redux';
import { CommentsContent } from './CommentsContent';

import { Formik, Form, Field, useFormik, FormikProvider } from 'formik';
import { object, string, z, ZodError } from 'zod';
import { getUkrainianPluralWord } from 'apps/client/app/lib/utils/getUkrainianPluralWord';

import moment from 'moment';
import NoCourseCommentsPoster from '../../../shared/posters/NoCourseCommentsPoster';
import { DefaultButton } from '../../../auth/shared/buttons/DefaultButton';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { TextareaFormInput } from '../../shared/inputs/TextareaFormInput';
import { io } from 'socket.io-client';
import { TCourseCommentResponse } from '../../@types/course';
import { FaArrowRight } from 'react-icons/fa6';

const [minCommentLength, maxCommentLength] = [1, 512];
const orderDictionary: { order: TSortOrder; title: string }[] = [
  {
    order: 'desc',
    title: 'Нові спочатку',
  },
  {
    order: 'asc',
    title: 'Старі спочатку',
  },
];

const userCommentSchema = object({
  text: string({ required_error: 'Коментар не може бути порожнім' })
    .min(
      minCommentLength,
      `Коментар повинен містити мінімум ${minCommentLength} ${getUkrainianPluralWord(
        'символи',
        minCommentLength,
      )}`,
    )
    .max(
      maxCommentLength,
      `Коментар повинен містити максимум ${maxCommentLength} ${getUkrainianPluralWord(
        'символи',
        maxCommentLength,
      )}`,
    ),
});
type TProps = {
  courseId: string;
  isEnrolled?: boolean;
};

type TSortOrder = 'asc' | 'desc';

const initialValues = { text: '' };

const socket = io(
  `${process.env.NEXT_PUBLIC_SERVER_URL_WEBSOCKETS}/course-comments`,
);

export const CommentsContentLayout: FC<TProps> = ({
  courseId,
  isEnrolled = false,
}) => {
  const backgroundColor = useColorModeValue('#F3F4FD', '#2B2C45');
  const user = useTypedSelector((state) => state.user);
  const seenIds = new Set();

  const [comments, setComments] = useState<TCourseCommentResponse[]>([]);
  const [sortOrder, setSortOrder] = useState<TSortOrder>('asc');

  const sortedComments = useMemo(() => {
    return comments?.sort((a, b) =>
      sortOrder === 'asc'
        ? moment(b.createdAt).diff(moment(a.createdAt))
        : moment(a.createdAt).diff(moment(b.createdAt)),
    );
  }, [comments, sortOrder]);

  const handleAddComment = async (text: string) => {
    socket.emit('createCourseComment', { text, userId: user.id, courseId });
  };

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('FORM VALUES: ', values);
    handleAddComment(values.text);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(userCommentSchema),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    socket.emit('findAllSortedCourseComments', { courseId, sortOrder });

    socket.on('receiveCourseComment', (newComments) => {
      // console.log('COMMENTS: ', comments);
      seenIds.clear();

      setComments((prev) => {
        const combinedComments = [...prev, ...newComments];
        const uniqueComments = combinedComments
          .filter((item) => {
            const isDuplicate = seenIds.has(item.id);
            seenIds.add(item.id);
            return !isDuplicate;
          })
          .slice(-15);
        return uniqueComments;
      });
    });

    // Clean up the socket listener on component unmount
    return () => {
      socket.off('receiveCourseComment');
    };
  }, []);

  return (
    <>
      <Center bg={backgroundColor}>
        <Box
          p='20px'
          maxWidth={1200}
          w={'full'}>
          <Flex
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            mb='10px'>
            <Text
              fontSize={{ base: '16', md: '24' }}
              mb={{ base: '2', md: '0' }}
              fontWeight='bold'>
              {comments.length}{' '}
              {getUkrainianPluralWord('коментарі', comments.length)}
            </Text>
            <Select
              w='fit-content'
              onChange={(value) =>
                setSortOrder(value.target.value as TSortOrder)
              }>
              {orderDictionary.map((sort) => (
                <option
                  value={sort.order}
                  key={sort.order}>
                  {sort.title}
                </option>
              ))}
            </Select>
          </Flex>
          <Divider
            mb='20px'
            borderWidth='2px'
          />
          {isEnrolled ? (
            <Flex
              mb='20px'
              gap={5}>
              <Avatar
                boxSize={{ base: '50px', md: '90px' }}
                src={user.image ?? ''}
                borderRadius={10}
              />
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <Flex
                    gap={3}
                    flexDirection={'row'}>
                    <TextareaFormInput
                      isInvalid={Boolean(
                        !!formik.errors.text && formik.touched.text,
                      )}
                      errorMessage={formik.errors.text ?? ''}
                      fieldName='text'
                      placeholder='Ваш коментар...'
                      w='50vw'
                    />
                    <IconButton
                      aria-label='Send comment'
                      type='submit'
                      icon={<FaArrowRight />}
                      isDisabled={Object.keys(formik.errors).length > 0}
                      colorScheme='purple'></IconButton>
                    {/* <DefaultButton
                    mt='10px'
                    type='submit'
                    variant='outline'
                    disabled={Object.keys(formik.errors).length > 0}>
                    Залишити коментар
                  </DefaultButton> */}
                  </Flex>
                </form>
              </FormikProvider>
            </Flex>
          ) : null}

          {sortedComments.length ? (
            sortedComments.map((comment, index) => (
              <CommentsContent
                key={index}
                imageUrl={comment.user.image ?? ''}
                userName={comment.user.name}
                userComment={comment.text}
                courseCreatorId={comment?.course?.creatorId ?? ''}
                commentUserId={comment.userId}
                userId={user.id}
                likesComment={0}
                dislikesComment={0}
              />
            ))
          ) : (
            <NoCourseCommentsPoster />
          )}
        </Box>
      </Center>
    </>
  );
};
