import React, { FC, useEffect } from 'react';
import { TCourseResponse } from '../@types/course';
import { Header as LayoutHeader } from '../../shared/header/Header';
import { Center, Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import { ContainerOptions } from '../../../config/UI/container.options';
import { any, number, object, string, TypeOf } from 'zod';
import { Formik } from 'formik';
import { TextFormInput } from '../../shared/inputs/TextFormInput';
import { TextareaFormInput } from '../shared/inputs/TextareaFormInput';
import { DifficultyFormInput } from '../shared/inputs/DifficultyFormInput';
import { TimeToPassFormInput } from '../shared/inputs/TimeToPassFormInput';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useCreateCourseMutation } from '../../../store/services/courses';
import { useShowError } from '../../../lib/hooks/useShowError';
import ImageUpload from '../shared/inputs/ImageUpload';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { useNotify } from '../../../lib/hooks/useNotify';
import { DefaultButton } from '../../auth/shared/buttons/DefaultButton';
import moment from 'moment/moment';

type Nullable<T> = { [K in keyof T]?: T[K] };
type TAlterCourseProps = Nullable<TCourseResponse> & { title: string };

export const AlterCourse: FC<TAlterCourseProps> = ({ title, ...props }) => {
  return (
    <LayoutHeader title={title}>
      <CourseInfoForm />
    </LayoutHeader>
  );
};

const MAX_FILE_SIZE = 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const alterCourseSchema = object({
  title: string({
    required_error: 'Введіть назву курсу',
  })
    .trim()
    .min(1, {
      message: 'Назва не може бути порожнью',
    })
    .max(64, {
      message: 'Назва занадто довга',
    }),
  purpose: string({
    required_error: 'Введіть призначення курсу',
  })
    .trim()
    .min(1, {
      message: 'Призначення не може бути порожнім',
    })
    .max(512, {
      message: 'Призначення занадто довге',
    }),
  description: string({
    required_error: 'Введіть опис курсу',
  })
    .trim()
    .min(1, {
      message: 'Опис не може бути порожнім',
    })
    .max(1028, {
      message: 'Опис занадто довгий',
    }),
  difficultyLevel: string().refine((level) => ['1', '2', '3'].includes(level), {
    message: 'Складність може бути лише простою, середнью або високою',
  }),
  timeToPass: number({
    required_error: 'Введіть час на проходження курсу',
  })
    .positive("Час не може бути від'ємним")
    .max(30, {
      message: 'Можна проходити курс лише 30 днів',
    }),
  file: any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `Максимальний розмір зображення – 1 МБ`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Підтримуються лише формати .jpg, .jpeg і .png',
    )
    .nullable()
    .optional(),
});
type TAlterCourseInputs = TypeOf<typeof alterCourseSchema>;
type TInitialValues = {
  title: string;
  purpose: string;
  description: string;
  difficultyLevel: string;
  timeToPass: number;
  file: File;
};

type TCourseInfoTableProps = Nullable<
  Omit<TCourseResponse, 'description' | 'sections'>
>;
const CourseInfoForm: FC<TCourseInfoTableProps> = ({
  title,
  numberOfPeopleEnrolled,
  purpose,
  difficultyLevel,
  image,
  timeToPass,
}) => {
  const user = useTypedSelector((state) => state.user);
  const notify = useNotify();
  const [createCourse, { data, error, isLoading, isSuccess }] =
    useCreateCourseMutation();
  useShowError(error, false);

  const backgroundColor = useColorModeValue('#F3F4FD', '#282B41');
  const onCourseCreate = async (values: TInitialValues) => {
    const { difficultyLevel, timeToPass, ...body } = values;

    createCourse({
      creatorId: user.id,
      difficultyLevel: Number(difficultyLevel),
      timeToPass: moment.duration(timeToPass, 'days').asSeconds(),
      ...body,
    });
  };

  useEffect(() => {
    if (isSuccess) notify('Курс створено!', 'success');
  }, [isSuccess]);

  return (
    <Center bg={backgroundColor}>
      <Flex
        p='5'
        {...ContainerOptions}>
        <Flex
          mr={5}
          w={'full'}
          justifyContent='space-between'
          flexDirection='column'>
          <Formik<TAlterCourseInputs>
            validateOnBlur={false}
            initialValues={{
              title: '',
              purpose: '',
              description: '',
              difficultyLevel: '1',
              timeToPass: 1,
            }}
            validationSchema={toFormikValidationSchema(alterCourseSchema)}
            onSubmit={(data) => onCourseCreate(data as TInitialValues)}>
            {({ handleSubmit, errors, handleChange, values, touched }) => (
              <form onSubmit={handleSubmit}>
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'flex-start'}>
                  <VStack
                    w={'80%'}
                    maxW={'600px'}
                    spacing={4}
                    align='flex-start'>
                    <TextFormInput
                      isInvalid={Boolean(!!errors.title && touched.title)}
                      errorMessage={errors.title ?? ''}
                      fieldName='title'
                      label={'Назва (64 символи)'}
                    />

                    <TextFormInput
                      isInvalid={Boolean(!!errors.purpose && touched.purpose)}
                      errorMessage={errors.purpose ?? ''}
                      fieldName='purpose'
                      label={'Короткий опис (512 символів)'}
                    />

                    <Flex
                      gap='3'
                      w='full'>
                      <DifficultyFormInput
                        isInvalid={Boolean(
                          !!errors.difficultyLevel && touched.difficultyLevel,
                        )}
                        errorMessage={errors.difficultyLevel ?? ''}
                        values={Number(values.difficultyLevel)}
                        fieldName={'difficultyLevel'}
                        label={'Рівень складності курсу'}
                        onChange={handleChange}
                      />

                      <TimeToPassFormInput
                        isInvalid={Boolean(
                          !!errors.timeToPass && touched.timeToPass,
                        )}
                        errorMessage={errors.timeToPass ?? ''}
                        fieldName='timeToPass'
                        onChange={handleChange}
                        value={values.timeToPass}
                        min={1}
                        max={30}
                        label={'Час на проходження курсу (днів)'}
                      />
                    </Flex>

                    <TextareaFormInput
                      isInvalid={Boolean(
                        !!errors.description && touched.description,
                      )}
                      errorMessage={errors.description ?? ''}
                      fieldName='description'
                      label={'Про курс (1028 символів)'}
                    />
                  </VStack>
                  <VStack align='center'>
                    <ImageUpload
                      isInvalid={Boolean(!!errors.file && touched.file)}
                      errorMessage={errors.file}
                      name={'file'}
                      label={'Upload Image'}
                    />
                    <DefaultButton
                      isLoading={isLoading}
                      w={'fit-content'}>
                      Створити курс
                    </DefaultButton>
                  </VStack>
                </Flex>
              </form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </Center>
  );
};
