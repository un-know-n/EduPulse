import React, { FC, useEffect, useState } from 'react';
import { TTestMaterial } from '../../@types/course';
import {
  Flex,
  Text,
  Box,
  Radio,
  Stack,
  Checkbox,
  Badge,
  FormControl,
  FormErrorMessage,
  Heading,
} from '@chakra-ui/react';
import { getUkrainianPluralWord } from 'apps/client/app/lib/utils/getUkrainianPluralWord';
import useTimer from 'apps/client/app/lib/hooks/useTimer';
import { DefaultButton } from '../../../auth/shared/buttons/DefaultButton';
import { FormikProvider, useFormik } from 'formik';
import { object, array, string, union } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { usePassCourseTestMutation } from 'apps/client/app/store/services/courses';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';

type TProps = {
  test: TTestMaterial;
};

// Validation Schema
const validationSchema = object({
  questions: array(
    object({
      questionId: string(),
      answers: array(string(), {
        required_error: 'Оберіть хоча б одну відповідь',
      }).min(1, 'Оберіть хоча б одну відповідь'),
    }),
  ),
});

export const CardTest: FC<TProps> = ({ test }) => {
  const [passCourseTest, { error, isLoading }] = usePassCourseTestMutation();
  useShowError(error, false);

  const { timeToPass, totalAttempts, questions, id, result } = test;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0,
  );
  const initialValues = {
    questions: questions.map((question) => ({
      questionId: question.id,
      answers: [],
    })),
  };

  useEffect(() => {
    console.log('TEST PROPS: ', test);
  }, []);

  const handleEnd = () => {
    passCourseTest({
      testId: id,
      answers: questions.map((question) => ({
        questionId: question.id,
        selectedAnswers: [],
      })),
    });
  };

  const { formattedTime, resetTimer, stopTimer, isRunning } = useTimer(
    Number((timeToPass / 1000).toFixed(0)),
    handleEnd,
  ); //0.2

  const handleSubmit = (values: typeof initialValues) => {
    const answers = values.questions.map((question) => ({
      questionId: question.questionId,
      selectedAnswers: question.answers as string[],
    }));

    passCourseTest({ testId: id, answers });
    stopTimer();
    formik.resetForm();

    console.log(answers);
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: handleSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box>
            <Flex alignItems='center'>
              <Heading
                size='18'
                textTransform='uppercase'>
                Тест
              </Heading>
              <Badge
                colorScheme={result.isCompleted ? 'green' : 'red'}
                ml={3}>
                {result.isCompleted
                  ? `Пройдено - ${result.score}/${totalPoints}`
                  : `Непройдено - ${result.score}/${totalPoints}`}
              </Badge>
            </Flex>

            <Text
              mb='10px'
              fontSize='14'>
              Імовірні {totalPoints}{' '}
              {getUkrainianPluralWord('бали', totalPoints)}
            </Text>
          </Box>

          {questions.map((question, index) => (
            <React.Fragment key={index}>
              <Text
                fontSize='16'
                fontWeight='medium'>
                {index + 1}. {question.text}
              </Text>
              <FormControl
                isInvalid={Boolean(
                  formik.errors.questions &&
                    formik.errors.questions[index] &&
                    formik.touched.questions &&
                    formik.touched.questions[index],
                )}>
                <Flex
                  flexDirection='column'
                  gap={2}
                  mb='10px'>
                  {question.answers.map((answer, idx) => (
                    <FormControl
                      isDisabled={!isRunning}
                      isInvalid={Boolean(formik?.errors?.questions?.[index])}
                      key={idx}>
                      <Box
                        p='10px'
                        borderWidth='2px'
                        borderRadius='md'>
                        {question.isMultipleChoice ? (
                          <Checkbox
                            colorScheme='purple'
                            name={`questions[${index}].answers`}
                            value={answer.text}
                            onChange={formik.handleChange}
                            isChecked={(
                              formik.values.questions[index].answers as string[]
                            ).includes(answer.text)}>
                            {answer.text}
                          </Checkbox>
                        ) : (
                          <Radio
                            colorScheme='purple'
                            name={`questions[${index}].answers`}
                            value={answer.text}
                            onChange={() =>
                              formik.setFieldValue(
                                `questions[${index}].answers`,
                                [answer.text],
                              )
                            }
                            isChecked={(
                              formik.values.questions[index].answers as string[]
                            ).includes(answer.text)}>
                            {answer.text}
                          </Radio>
                        )}
                      </Box>
                    </FormControl>
                  ))}
                </Flex>
                <FormErrorMessage>
                  {(formik.errors.questions?.[index] as any)?.answers}
                </FormErrorMessage>
              </FormControl>
            </React.Fragment>
          ))}
          <Flex alignItems='center'>
            {isRunning ? (
              <DefaultButton
                isDisabled={
                  Boolean(formik.errors.questions?.length) ||
                  result.currentAttempt === test.totalAttempts
                }
                w='fit-content'
                type='submit'
                variant='outline'>
                Відправити
              </DefaultButton>
            ) : (
              <DefaultButton
                isDisabled={
                  result.currentAttempt === test.totalAttempts ||
                  result.isCompleted
                }
                onClick={resetTimer}
                w='fit-content'
                type='button'
                variant='outline'>
                Розпочати
              </DefaultButton>
            )}
            <Flex
              w={'full'}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Flex>
                <Text
                  ml='10px'
                  fontSize={{ base: '14', md: '16' }}
                  mr={3}>
                  Ви використали {result.currentAttempt} з {totalAttempts} спроб
                </Text>
                <Text
                  ml='10px'
                  fontSize={{ base: '14', md: '16' }}
                  mr={3}>
                  Набрано {result.score}{' '}
                  {getUkrainianPluralWord('бали', result.score)}
                </Text>
              </Flex>

              <Badge
                fontSize={'xl'}
                variant={'outline'}
                colorScheme='red'>
                {formattedTime}
              </Badge>
            </Flex>
          </Flex>
        </Stack>
      </form>
    </FormikProvider>
  );
};
