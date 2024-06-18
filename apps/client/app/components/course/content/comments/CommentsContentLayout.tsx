import React, { FC, useState } from 'react';
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
  Input,
  Button,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../../../lib/hooks/redux';
import { CommentsContent } from './CommentsContent';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
import { z, ZodError } from 'zod';
import { getUkrainianPluralWord } from 'apps/client/app/lib/utils/getUkrainianPluralWord';

const userCommentSchema = z
  .string()
  .min(1, 'Коментар повинен містити мінімум 1 символ')
  .max(300, 'Коментар повинен містити максимум 300 символів');

const validateUserComment = (value: string) => {
  try {
    userCommentSchema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors[0].message;
    }
    return 'Помилка валідації';
  }
};

type TProps = {
  imageUrl: string;
  quantityComment: number;
};

type TComment = {
  userName: string;
  userComment: string;
  likesComment: number;
  dislikesComment: number;
};

export const CommentsContentLayout: FC<TProps> = ({
  imageUrl,
  quantityComment,
}) => {
  const backgroundColor = useColorModeValue('#F3F4FD', '#2B2C45');
  const user = useTypedSelector((state) => state.user);
  const [comments, setComments] = useState<TComment[]>([]);

  const handleCommentSubmit = (commentInput: string) => {
    const newComment: TComment = {
      userName: user.name || 'User',
      userComment: commentInput,
      likesComment: 0,
      dislikesComment: 0,
    };
    setComments([...comments, newComment]);
  };

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
              {quantityComment}{' '}
              {getUkrainianPluralWord('коментарі', quantityComment)}
            </Text>
            <Select w='fiil-content'>
              <option value='option1'>Найпопулярніші</option>
              <option value='option2'>Спочатку нові</option>
              <option value='option3'>Спочатку старі</option>
            </Select>
          </Flex>
          <Divider
            mb='20px'
            borderWidth='2px'
          />
          <Flex mb='20px'>
            <Avatar
              boxSize='50px'
              src={imageUrl}
              mr='10px'
              borderRadius='10px'
            />
            <Formik
              initialValues={{ comment: '' }}
              validate={(values) => {
                try {
                  userCommentSchema.parse(values.comment);
                  return {};
                } catch (error) {
                  return {
                    comment:
                      error instanceof ZodError
                        ? error.errors[0].message
                        : 'Помилка валідації',
                  };
                }
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                handleCommentSubmit(values.comment);
                setSubmitting(false);
                resetForm();
              }}>
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name='comment'
                    validate={validateUserComment}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.comment && form.touched.comment}>
                        <Input
                          {...field}
                          placeholder='Напишіть коментар...'
                          w={{ base: 'auto', md: '400px' }}
                        />
                        <FormErrorMessage mb='10px'>
                          {form.errors.comment}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt='10px'
                    type='submit'
                    bg='purple.600'
                    color='white'
                    _hover={{
                      bg: 'purple.800',
                      transitionDuration: '.4s',
                    }}
                    variant='outline'
                    disabled={isSubmitting}>
                    Залишити коментар
                  </Button>
                </Form>
              )}
            </Formik>
          </Flex>
          {comments.length === 0 && (
            <Box
              textAlign='center'
              py={10}>
              <Text
                fontSize='xl'
                fontWeight='bold'>
                Залиште перший коментар!
              </Text>
            </Box>
          )}
          {comments.map((comment, index) => (
            <CommentsContent
              key={index}
              imageUrl=''
              userName={comment.userName}
              userComment={comment.userComment}
              likesComment={comment.likesComment}
              dislikesComment={comment.dislikesComment}
            />
          ))}
        </Box>
      </Center>
    </>
  );
};
