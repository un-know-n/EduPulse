import React, { FC } from 'react';
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
  Textarea,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'apps/client/app/store/store';
import { Formik, Form, Field } from 'formik';
import { z, ZodError } from 'zod';

const lectureNameSchema = z
  .string()
  .nonempty("Назва лекції є обов'язковою")
  .min(3, 'Мінімальна довжина назви лекції повинна бути 3 символи')
  .max(64, 'Максимальна довжина назви лекції повинна бути 64 символи');
const lectureContentSchema = z
  .string()
  .nonempty("Вміст лекції є обов'язковим")
  .min(3, 'Мінімальна довжина вмісту лекції повинна бути 3 символи')
  .max(512, 'Максимальна довжина вмісту лекції повинна бути 512 символів');

const validateLectureName = (value: string) => {
  try {
    lectureNameSchema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors[0].message;
    }
    return 'Помилка валідації';
  }
};

const validateLectureContent = (value: string) => {
  try {
    lectureContentSchema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors[0].message;
    }
    return 'Помилка валідації';
  }
};

type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddLectureModal: FC<TProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const lectureName = useSelector(
    (state: RootState) => state.lecture.lectureName,
  );
  const lectureContent = useSelector(
    (state: RootState) => state.lecture.lectureContent,
  );

  const handleSave = (values: any) => {
    const lectureNameError = validateLectureName(values.lectureName);
    const lectureContentError = validateLectureContent(values.lectureContent);

    if (lectureNameError || lectureContentError) {
      console.error(
        'Помилка валідації:',
        lectureNameError,
        lectureContentError,
      );
      return;
    }

    console.log('Saved Lecture Name:', values.lectureName);
    console.log('Saved Lecture Content:', values.lectureContent);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Створіть лекцію</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ lectureName, lectureContent }}
            onSubmit={handleSave}>
            <Form>
              <ModalBody>
                <Stack spacing='20px'>
                  <Field
                    name='lectureName'
                    validate={validateLectureName}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.lectureName && form.touched.lectureName
                        }>
                        <FormLabel>Назва лекції</FormLabel>
                        <Input
                          {...field}
                          type='text'
                        />
                        <FormErrorMessage>
                          {form.errors.lectureName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name='lectureContent'
                    validate={validateLectureContent}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.lectureContent &&
                          form.touched.lectureContent
                        }>
                        <FormLabel>Вміст лекції</FormLabel>
                        <Textarea {...field} />
                        <FormErrorMessage>
                          {form.errors.lectureContent}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme='purple'
                  mr={3}
                  type='submit'>
                  Зберегти
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
