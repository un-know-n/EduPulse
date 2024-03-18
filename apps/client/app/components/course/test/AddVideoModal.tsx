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

const videoNameSchema = z
  .string()
  .nonempty("Назва відео є обов'язковою")
  .min(3, 'Мінімальна довжина назви відео повинна бути 3 символи')
  .max(64, 'Максимальна довжина назви відео повинна бути 64 символи');
const videoURLSchema = z
  .string()
  .nonempty("Посилання на відео є обов'язковим")
  .url('Посилання на відео повинно бути URL-адресою');
const videoContentSchema = z.string().nullable();

const validateVideoName = (value: string) => {
  try {
    videoNameSchema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors[0].message;
    }
    return 'Помилка валідації';
  }
};

const validateVideoURL = (value: string) => {
  try {
    videoURLSchema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors[0].message;
    }
    return 'Помилка валідації';
  }
};

const validateVideoContent = (value: string | null) => {
  if (value === null) {
    return '';
  }
  try {
    videoContentSchema.parse(value);
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

export const AddVideoModal: FC<TProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const videoName = useSelector((state: RootState) => state.video.videoName);
  const videoURL = useSelector((state: RootState) => state.video.videoURL);
  const videoContent = useSelector(
    (state: RootState) => state.video.videoContent,
  );

  const handleSave = (values: any) => {
    const videoNameError = validateVideoName(values.videoName);
    const videoURLError = validateVideoURL(values.videoURL);
    const videoContentError = validateVideoContent(values.videoContent);

    if (videoNameError || videoURLError || videoContentError) {
      console.error(
        'Помилка валідації:',
        videoNameError,
        videoURLError,
        videoContentError,
      );
      return;
    }

    console.log('Saved Video Name:', values.videoName);
    console.log('Saved Video URL:', values.videoURL);
    console.log('Saved Video Content:', values.videoContent);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Створіть відео</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ videoName, videoURL, videoContent }}
            onSubmit={handleSave}>
            <Form>
              <ModalBody>
                <Stack spacing='20px'>
                  <Field
                    name='videoName'
                    validate={validateVideoName}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.videoName && form.touched.videoName
                        }>
                        <FormLabel>Назва відео</FormLabel>
                        <Input
                          {...field}
                          type='text'
                        />
                        <FormErrorMessage>
                          {form.errors.videoName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name='videoURL'
                    validate={validateVideoURL}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.videoURL && form.touched.videoURL
                        }>
                        <FormLabel>Посилання на відео</FormLabel>
                        <Input
                          {...field}
                          type='url'
                        />
                        <FormErrorMessage>
                          {form.errors.videoURL}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name='videoContent'
                    validate={validateVideoContent}>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.videoContent && form.touched.videoContent
                        }>
                        <FormLabel>Опис відео</FormLabel>
                        <Textarea {...field} />
                        <FormErrorMessage>
                          {form.errors.videoContent}
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
