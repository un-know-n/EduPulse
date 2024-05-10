import React, { FC, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Radio,
  Textarea,
  Flex,
  IconButton,
  HStack,
  Box,
  Card,
  CardBody,
  useColorMode,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  addStep,
  resetTestForm,
  updateTestName,
  Step,
} from 'apps/client/app/store/reducers/test.slice';
import { FaPlus, FaTimes } from 'react-icons/fa';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddTestModal: FC<TProps> = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const dispatch = useDispatch();

  const getBgColor = (isSingleAnswer: boolean) => {
    return isSingleAnswer
      ? colorMode === 'light'
        ? '#D2D7FF'
        : '#3C4D69'
      : colorMode === 'light'
      ? '#E4E7FF'
      : '#566A8D';
  };

  const formik = useFormik({
    initialValues: {
      testName: '',
      steps: [] as Step[],
    },
    onSubmit: (values) => {
      dispatch(updateTestName(values.testName));
      values.steps.forEach((step) => {
        dispatch(
          addStep({
            stepNumber: step.stepNumber,
            stepQuestion: step.stepQuestion,
            pointsPerQuestion: step.pointsPerQuestion,
            isSingleAnswer: step.isSingleAnswer,
            answers: step.answers,
            correctAnswer: step.correctAnswer,
          }),
        );
      });

      const totalTestPoints = values.steps.reduce(
        (acc, step) => acc + step.pointsPerQuestion,
        0,
      );

      console.log('Test Name:', values.testName);
      console.log('Total Test Points:', totalTestPoints);
      console.log('Steps:');
      values.steps.forEach((step) => {
        console.log('Step Number:', step.stepNumber);
        console.log('Step Question:', step.stepQuestion);
        console.log('Points Per Question:', step.pointsPerQuestion);
        console.log('Is Single Answer:', step.isSingleAnswer);
        console.log('Answers:', step.answers);
        console.log('Correct Answer:', step.correctAnswer);
        console.log('--------------------------');
      });

      formik.resetForm();
      onClose();
    },
  });

  const handleOpenModal = () => {
    formik.resetForm();
    setActiveStep(null);
  };

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
          pointsPerQuestion: 1,
          isSingleAnswer: true,
          answers,
          correctAnswer: '',
        },
      ],
    });
    setActiveStep(stepNumber - 1);
  };

  const removeStepField = (index: number) => {
    const updatedSteps = [...formik.values.steps];
    updatedSteps.splice(index, 1);
    formik.setValues({
      ...formik.values,
      steps: updatedSteps.map((step, idx) => ({
        ...step,
        stepNumber: idx + 1,
        answers: step.answers.map((_, ansIdx) => `Варіант ${ansIdx + 1}`),
      })),
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
        (_, index) => index !== answerIndex,
      );
      formik.setFieldValue(`steps.${activeStep}.answers`, newAnswers);
      if (currentStep.correctAnswer === currentStep.answers[answerIndex]) {
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

  return (
    <>
      <Modal
        size='lg'
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Створіть тест</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl mb='20px'>
                <FormLabel>Назва тесту</FormLabel>
                <Input
                  type='text'
                  name='testName'
                  value={formik.values.testName}
                  onChange={formik.handleChange}
                />
              </FormControl>
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
              {activeStep !== null && formik.values.steps[activeStep] && (
                <Stack mt='20px'>
                  <FormControl>
                    <FormLabel>{`Крок ${formik.values.steps[activeStep].stepNumber} | Тест | Умова`}</FormLabel>
                    <Textarea
                      name={`steps.${activeStep}.stepQuestion`}
                      value={formik.values.steps[activeStep].stepQuestion}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                  <Card bg={colorMode === 'light' ? '#F3F4FD' : '#455674'}>
                    <CardBody>
                      <FormLabel mb='20px'>{`Крок ${formik.values.steps[activeStep].stepNumber} | Тест | Налаштування`}</FormLabel>
                      <FormLabel mr='10px'>Балів за крок:</FormLabel>
                      <NumberInput
                        mb='20px'
                        min={1}
                        max={10}
                        name={`steps.${activeStep}.pointsPerQuestion`}
                        value={
                          formik.values.steps[activeStep].pointsPerQuestion
                        }
                        onChange={(valueString) => {
                          const value = parseInt(valueString);
                          formik.setFieldValue(
                            `steps.${activeStep}.pointsPerQuestion`,
                            value,
                          );
                        }}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormControl mb='20px'>
                        <FormLabel>Кількість правильних відповідей:</FormLabel>
                        <Flex>
                          <Stack
                            borderRadius='10px'
                            bg={getBgColor(
                              formik.values.steps[activeStep].isSingleAnswer,
                            )}
                            direction='row'
                            mr='10px'>
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
                                  !formik.values.steps[activeStep]
                                    .isSingleAnswer
                                }
                                onChange={() => {
                                  formik.setFieldValue(
                                    `steps.${activeStep}.isSingleAnswer`,
                                    !formik.values.steps[activeStep]
                                      .isSingleAnswer,
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
                      <FormControl>
                        <FormLabel>
                          Додайте варіанти відповіді та позначте правильні!
                        </FormLabel>
                        {formik.values.steps[activeStep].answers.map(
                          (answer, answerIndex) => (
                            <Flex
                              key={answerIndex}
                              align='center'
                              mb='10px'>
                              {formik.values.steps[activeStep]
                                .isSingleAnswer ? (
                                <Radio
                                  colorScheme='green'
                                  name={`steps.${activeStep}.correctAnswer`}
                                  value={answer}
                                  isChecked={
                                    formik.values.steps[activeStep]
                                      .correctAnswer === answer
                                  }
                                  onChange={() =>
                                    formik.setFieldValue(
                                      `steps.${activeStep}.correctAnswer`,
                                      answer,
                                    )
                                  }
                                  mr='10px'
                                  isDisabled={
                                    !formik.values.steps[activeStep]
                                      .isSingleAnswer
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
                                      newCorrectAnswers =
                                        newCorrectAnswers.filter(
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
                              <Input
                                type='text'
                                value={answer}
                                mr='10px'
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
                              {formik.values.steps[activeStep].answers.length >
                                2 && (
                                <IconButton
                                  aria-label='RemoveAnswer'
                                  size='xs'
                                  icon={<FaTimes />}
                                  onClick={() =>
                                    handleRemoveAnswer(answerIndex)
                                  }
                                />
                              )}
                            </Flex>
                          ),
                        )}
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
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme='purple'
                mr='10px'
                type='submit'>
                Зберегти тест
              </Button>
              <Button onClick={onClose}>Закрити</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
