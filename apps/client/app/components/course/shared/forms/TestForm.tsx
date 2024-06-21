import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Radio,
  Stack,
  Text,
  Textarea,
  useColorMode,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import { FC, useState, useEffect } from 'react';
import { DefaultButton } from '../../../auth/shared/buttons/DefaultButton';
import { TextFormInput } from '../../../shared/inputs/TextFormInput';
import { Nullable, TTestResponse } from '../../@types/course';

import { FaPlus, FaTimes } from 'react-icons/fa';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  TInitialTestValues,
  maxTimeToPassAmount,
  maxTotalAttempts,
  minPointsPerQuestion,
  minStepsAmount,
  minTimeToPassAmount,
  minTotalAttempts,
  testSchema,
} from '../schemas/test';
import { FormNumberInput } from '../inputs/FormNumberInput';
import {
  useCreateTestMutation,
  useUpdateTestMutation,
} from 'apps/client/app/store/services/courses';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import { useAreObjectsEqual } from 'apps/client/app/lib/hooks/useAreObjectsEqual';
import { getUkrainianPluralWord } from 'apps/client/app/lib/utils/getUkrainianPluralWord';

type TProps = Nullable<
  Pick<
    TTestResponse,
    'questions' | 'timeToPass' | 'title' | 'totalAttempts' | 'id'
  >
> &
  Pick<TTestResponse, 'sectionId'> & {
    onClose: () => void;
  };

type TSubmitValues = Omit<TTestResponse, 'id' | 'sectionId' | 'createdAt'>;

export const TestForm: FC<TProps> = ({
  sectionId,
  id,
  questions,
  timeToPass,
  title,
  totalAttempts,
  onClose,
}) => {
  const [
    updateTest,
    {
      isLoading: isLoadingUpdate,
      error: isUpdateError,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateTestMutation();
  const [
    createTest,
    {
      isLoading: isLoadingCreate,
      error: isCreateError,
      isSuccess: isSuccessCreate,
    },
  ] = useCreateTestMutation();
  const { notify } = useShowError(isUpdateError, false);
  useShowError(isCreateError, false);

  const handleTestSubmit = async (values: TSubmitValues) => {
    // console.log('FINAL VALUES: ', values);
    if (id) {
      return updateTest({
        id,
        ...values,
      });
    }
    createTest({
      sectionId,
      ...values,
    });
  };

  const { colorMode } = useColorMode();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const getBgColor = (isSingleAnswer: boolean) => {
    return isSingleAnswer
      ? colorMode === 'light'
        ? '#D2D7FF'
        : '#3C4D69'
      : colorMode === 'light'
      ? '#E4E7FF'
      : '#566A8D';
  };

  const initialValues = {
    testName: title ?? '',
    timeToPass: timeToPass
      ? Number((timeToPass / 1000).toFixed(0))
      : minTimeToPassAmount,
    totalAttempts: totalAttempts ?? minTotalAttempts,
    steps: questions?.length
      ? questions.map((question, index) => ({
          stepQuestion: question.text,
          answers: question.answers.map((answer) => answer.text),
          correctAnswer: question.answers
            .filter((answer) => answer.isCorrect)
            .map((answer) => answer.text),
          stepNumber: index + 1,
          active: index + 1 === 1,
          isSingleAnswer: !question.isMultipleChoice,
          pointsPerQuestion: question.points,
        }))
      : [],
  };

  const checkObjectsEquality = useAreObjectsEqual(initialValues);
  const [isDisabledSubmitButton, setDisabledSubmitButton] = useState(false);

  const formik = useFormik<TInitialTestValues>({
    initialValues,
    validateOnBlur: true,
    validationSchema: toFormikValidationSchema(testSchema),
    onSubmit: (values) => {
      const test = {
        title: values.testName,
        timeToPass: values.timeToPass * 1000,
        totalAttempts: values.totalAttempts,

        questions: values.steps.map((question) => ({
          text: question.stepQuestion,
          points: question.pointsPerQuestion,
          isMultipleChoice: !question.isSingleAnswer,
          answers: question.answers.map((answer: any) => ({
            text: answer,
            isCorrect: question.correctAnswer.includes(answer),
          })),
        })),
      };

      // console.log('VALUES ARE HERE ------------->: ', values);
      // console.log('HERE IS THE TEST OBJECT: ', test);

      handleTestSubmit(test as TSubmitValues);
    },
  });

  const addStepField = () => {
    const stepNumber = formik.values.steps.length + 1;
    const answers = Array.from(
      { length: 3 },
      (_, index) => `Варіант ${index + 1}`,
    );
    formik.setValues({
      ...formik.values,
      steps: [
        ...formik.values.steps,
        {
          stepNumber,
          stepQuestion: '',
          pointsPerQuestion: minPointsPerQuestion,
          isSingleAnswer: true,
          answers,
          correctAnswer: [],
        },
      ],
    });
    setActiveStep(stepNumber - 1);
  };

  const removeStepField = (index: number) => {
    const updatedSteps = [...formik.values.steps];
    updatedSteps.splice(index, 1);

    // console.log('UPDATED STEPS: ', updatedSteps);

    formik.setValues({
      ...formik.values,
      steps: updatedSteps.length
        ? updatedSteps.map((step, idx) => ({
            ...step,
            stepNumber: idx + 1,
            answers: step.answers.map(
              (answer: string, ansIdx: number) =>
                answer || `Варіант ${ansIdx + 1}`,
            ),
          }))
        : [],
    });

    let updatedActiveStep = activeStep;
    if (activeStep === index) {
      if (index === updatedSteps.length) {
        updatedActiveStep = index - 1;
      } else {
        updatedActiveStep = index;
      }
    } else if (activeStep !== null && activeStep > index) {
      updatedActiveStep = activeStep - 1;
    }
    setActiveStep(updatedActiveStep);
  };

  const handleRemoveAnswer = (answerIndex: number) => {
    if (activeStep !== null) {
      const currentStep = formik.values.steps[activeStep];

      const newAnswers = currentStep.answers.filter(
        (_: any, index: number) => index !== answerIndex,
      );
      formik.setFieldValue(`steps.${activeStep}.answers`, newAnswers);
      if (
        (currentStep.correctAnswer as any) === currentStep.answers[answerIndex]
      ) {
        formik.setFieldValue(`steps.${activeStep}.correctAnswer`, '');
      } else {
        const correctAnswerIndex = currentStep.correctAnswer.indexOf(
          currentStep.answers[answerIndex],
        );
        if (correctAnswerIndex !== -1) {
          const newCorrectAnswers = [...currentStep.correctAnswer];
          newCorrectAnswers.splice(correctAnswerIndex, 1);
          formik.setFieldValue(
            `steps.${activeStep}.correctAnswer`,
            newCorrectAnswers,
          );
        }
      }
    }
  };

  const handleAddAnswer = () => {
    if (activeStep !== null) {
      const newAnswers = [
        ...formik.values.steps[activeStep].answers,
        `Варіант ${formik.values.steps[activeStep].answers.length + 1}`,
      ];
      formik.setFieldValue(`steps.${activeStep}.answers`, newAnswers);
    }
  };

  useEffect(() => {
    const noChange = checkObjectsEquality(
      formik.values as typeof initialValues,
    );
    setDisabledSubmitButton(noChange);
  }, [JSON.stringify(formik.values), JSON.stringify(initialValues)]);

  useEffect(() => {
    if (isSuccessCreate) {
      notify('Тест створено', 'success');
    } else if (isSuccessUpdate) {
      notify('Тест оновлено', 'success');
    }

    if (isSuccessCreate || isSuccessUpdate) {
      formik.resetForm();
      onClose();
    }
  }, [isSuccessCreate, isSuccessUpdate]);

  // useEffect(() => {
  //   console.log('FORMIK ERRORS: ', formik.errors);
  // }, [formik.errors]);

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <TextFormInput
          isInvalid={Boolean(!!formik.errors.testName)}
          errorMessage={formik.errors.testName ?? ''}
          fieldName='testName'
          label={'Назва тесту'}
        />

        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          gap={3}
          mt={3}>
          <FormNumberInput
            isInvalid={Boolean(!!formik.errors.timeToPass)}
            errorMessage={formik.errors.timeToPass ?? ''}
            fieldName='timeToPass'
            mb='20px'
            min={minTimeToPassAmount}
            max={maxTimeToPassAmount}
            label={`Час іспиту(хв.):`}
          />
          <FormNumberInput
            isInvalid={Boolean(!!formik.errors.totalAttempts)}
            errorMessage={formik.errors.totalAttempts ?? ''}
            fieldName='totalAttempts'
            mb='20px'
            min={minTotalAttempts}
            max={maxTotalAttempts}
            label={`Кількість спроб:`}
          />
        </Flex>

        <HStack
          flexWrap='wrap'
          justifyContent={{ base: 'center', md: 'flex-start' }}>
          {formik.values.steps.map((step, index) => (
            <Button
              key={index}
              colorScheme={activeStep === index ? 'yellow' : 'blue'}
              onClick={() => setActiveStep(index)}
              boxSize='50px'>
              {index + 1}
            </Button>
          ))}
          <IconButton
            colorScheme='purple'
            aria-label='AddStep'
            boxSize='50px'
            icon={<FaPlus />}
            onClick={addStepField}
          />
        </HStack>
        {activeStep != null &&
        activeStep >= 0 &&
        formik.values.steps.length >= 0 &&
        formik.values.steps[activeStep] ? (
          <Stack mt='20px'>
            <FormControl
              isInvalid={Boolean(
                !!(formik.errors.steps?.[activeStep] as any)?.['stepQuestion'],
              )}>
              <FormLabel>{`Крок ${formik.values.steps[activeStep].stepNumber} | Тест | Умова`}</FormLabel>
              <Textarea
                name={`steps.${activeStep}.stepQuestion`}
                value={formik.values.steps[activeStep].stepQuestion}
                onChange={formik.handleChange}
              />
              <FormErrorMessage>
                {(formik.errors?.steps?.[activeStep] as any)?.[
                  'stepQuestion'
                ] ?? ''}
              </FormErrorMessage>
            </FormControl>
            <Card bg={colorMode === 'light' ? '#F3F4FD' : '#455674'}>
              <CardBody>
                <FormLabel mb='20px'>{`Крок ${formik.values.steps[activeStep].stepNumber} | Тест | Налаштування`}</FormLabel>
                <FormNumberInput
                  isInvalid={false}
                  errorMessage={''}
                  fieldName={`steps.${activeStep}.pointsPerQuestion`}
                  mb='20px'
                  min={1}
                  max={10}
                  label={`Балів за крок:`}
                />
                <FormControl mb='20px'>
                  <FormLabel>Кількість правильних відповідей:</FormLabel>
                  <Flex>
                    <Stack
                      borderRadius='10px'
                      bg={getBgColor(
                        formik.values.steps[activeStep].isSingleAnswer,
                      )}
                      direction='row'>
                      <Box
                        borderLeftRadius='10px'
                        bg={colorMode === 'light' ? '#D2D7FF' : '#3C4D69'}
                        p='10px'>
                        <Radio
                          colorScheme='purple'
                          isChecked={
                            formik.values.steps[activeStep].isSingleAnswer
                          }
                          onChange={() => {
                            formik.setFieldValue(
                              `steps.${activeStep}.isSingleAnswer`,
                              true,
                            );
                            formik.setFieldValue(
                              `steps.${activeStep}.correctAnswer`,
                              '',
                            );
                          }}>
                          Один
                        </Radio>
                      </Box>
                      <Box
                        borderRightRadius='10px'
                        bg={colorMode === 'light' ? '#E4E7FF' : '#566A8D'}
                        p='10px'>
                        <Checkbox
                          colorScheme='purple'
                          isChecked={
                            !formik.values.steps[activeStep].isSingleAnswer
                          }
                          onChange={() => {
                            formik.setFieldValue(
                              `steps.${activeStep}.isSingleAnswer`,
                              !formik.values.steps[activeStep].isSingleAnswer,
                            );
                            formik.setFieldValue(
                              `steps.${activeStep}.correctAnswer`,
                              [],
                            );
                          }}>
                          Декілька
                        </Checkbox>
                      </Box>
                    </Stack>
                  </Flex>
                </FormControl>
                <FormControl
                  isInvalid={Boolean(
                    !!(formik.errors.steps?.[activeStep] as any)?.[
                      'correctAnswer'
                    ],
                  )}>
                  <FormLabel>
                    Додайте варіанти відповіді та позначте правильні!
                  </FormLabel>
                  {formik.values.steps[activeStep].answers.map(
                    (answer: any, answerIndex: any) => (
                      <Flex
                        key={answerIndex}
                        align='center'
                        mb='10px'>
                        {formik.values.steps[activeStep].isSingleAnswer ? (
                          <Radio
                            colorScheme='green'
                            name={`steps.${activeStep}.correctAnswer`}
                            value={answer}
                            isChecked={
                              formik.values.steps[activeStep]
                                .correctAnswer[0] === answer
                            }
                            onChange={() =>
                              formik.setFieldValue(
                                `steps.${activeStep}.correctAnswer`,
                                [answer],
                              )
                            }
                            mr='10px'
                            isDisabled={
                              !formik.values.steps[activeStep].isSingleAnswer
                            }
                          />
                        ) : (
                          <Checkbox
                            colorScheme='green'
                            isChecked={formik.values.steps[
                              activeStep
                            ].correctAnswer.includes(answer)}
                            onChange={(event) => {
                              const isChecked = event.target.checked;
                              let newCorrectAnswers = [
                                ...formik.values.steps[activeStep]
                                  .correctAnswer,
                              ];
                              if (isChecked) {
                                newCorrectAnswers.push(answer);
                              } else {
                                newCorrectAnswers = newCorrectAnswers.filter(
                                  (item) => item !== answer,
                                );
                              }
                              formik.setFieldValue(
                                `steps.${activeStep}.correctAnswer`,
                                newCorrectAnswers,
                              );
                            }}
                            mr='10px'
                          />
                        )}
                        <Flex
                          flexDirection='column'
                          align='flex-start'
                          mr='10px'>
                          <Input
                            type='text'
                            value={answer}
                            onChange={(event) => {
                              const newAnswers = [
                                ...formik.values.steps[activeStep].answers,
                              ];
                              newAnswers[answerIndex] = event.target.value;
                              formik.setFieldValue(
                                `steps.${activeStep}.answers`,
                                newAnswers,
                              );
                            }}
                          />
                          <FormErrorMessage>
                            {(formik.errors?.steps?.[activeStep] as any)?.[
                              'answers'
                            ]?.[answerIndex] ?? ''}
                          </FormErrorMessage>
                        </Flex>

                        {formik.values.steps[activeStep].answers.length > 2 && (
                          <IconButton
                            aria-label='RemoveAnswer'
                            size='sm'
                            icon={<FaTimes />}
                            onClick={() => handleRemoveAnswer(answerIndex)}
                          />
                        )}
                      </Flex>
                    ),
                  )}
                  <FormErrorMessage mb={3}>
                    {(formik.errors?.steps?.[activeStep] as any)?.[
                      'correctAnswer'
                    ] ?? ''}
                  </FormErrorMessage>
                  <IconButton
                    colorScheme='purple'
                    aria-label='AddAnswer'
                    boxSize='30px'
                    icon={<FaPlus />}
                    onClick={handleAddAnswer}
                  />
                </FormControl>
              </CardBody>
            </Card>
            <Button
              colorScheme='red'
              onClick={() => removeStepField(activeStep)}>
              Видалити крок
            </Button>
          </Stack>
        ) : null}
        {formik.values.steps.length === 0 ? (
          <Text
            my={3}
            color='#fc8181'>
            {`Має бути щонайменше ${minStepsAmount} ${getUkrainianPluralWord(
              'кроки',
              minStepsAmount,
            )}`}
          </Text>
        ) : null}
        <Flex
          mt={3}
          justifyContent={'flex-end'}>
          <DefaultButton
            w={'fit-content'}
            type={'submit'}
            mr={3}
            isDisabled={
              isDisabledSubmitButton || Object.keys(formik.errors).length > 0
            }
            isLoading={isLoadingCreate || isLoadingUpdate}>
            Зберегти
          </DefaultButton>
          <Button onClick={onClose}>Закрити</Button>
        </Flex>
      </form>
    </FormikProvider>
  );
};
