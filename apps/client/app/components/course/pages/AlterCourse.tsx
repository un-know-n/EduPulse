import React, { FC, useEffect, useState } from 'react';
import { Nullable, TCourseResponse } from '../@types/course';
import { Header as LayoutHeader } from '../../shared/header/Header';
import {
  Accordion,
  Center,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ContainerOptions } from '../../../config/UI/container.options';
import { any, number, object, string, TypeOf } from 'zod';
import { FormikProvider, useFormik } from 'formik';
import { TextFormInput } from '../../shared/inputs/TextFormInput';
import { TextareaFormInput } from '../shared/inputs/TextareaFormInput';
import { DifficultyFormInput } from '../shared/inputs/DifficultyFormInput';
import { TimeToPassFormInput } from '../shared/inputs/TimeToPassFormInput';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from '../../../store/services/courses';
import { useShowError } from '../../../lib/hooks/useShowError';
import ImageUpload from '../shared/inputs/ImageUpload';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { DefaultButton } from '../../auth/shared/buttons/DefaultButton';
import moment from 'moment/moment';
import { useAreObjectsEqual } from '../../../lib/hooks/useAreObjectsEqual';
import { SectionItem } from '../shared/list/SectionItem';
import { CreateSectionButton } from '../shared/buttons/CreateSectionButton';
import CreateCoursePoster from '../../shared/posters/CreateCoursePoster';

type TAlterCourseProps = Nullable<TCourseResponse> & { pageTitle: string };

export const AlterCourse: FC<TAlterCourseProps> = ({ pageTitle, ...props }) => {
  return (
    <LayoutHeader title={pageTitle}>
      <CourseInfoForm {...props} />
      {props.title ? (
        <CourseProgram
          sections={props.sections}
          id={props.id}
        />
      ) : (
        <CreateCoursePoster />
      )}
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
  Omit<
    TCourseResponse,
    'sections' | 'UsersAssignedToCourse' | 'numberOfPeopleEnrolled'
  >
>;
const CourseInfoForm: FC<TCourseInfoTableProps> = ({
  title,
  purpose,
  difficultyLevel,
  description,
  image,
  timeToPass,
  id,
}) => {
  const user = useTypedSelector((state) => state.user);
  const [
    createCourse,
    {
      data: createData,
      error: createError,
      isLoading: isLoadingCreate,
      isSuccess: isSuccessCreate,
    },
  ] = useCreateCourseMutation();
  const [
    updateCourse,
    {
      error: updateError,
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateCourseMutation();

  const { notify, router } = useShowError(createError, false);
  useShowError(updateError, false);

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

  const onCourseUpdate = async (values: TInitialValues) => {
    const { difficultyLevel, timeToPass, ...body } = values;

    updateCourse({
      id: id ?? '',
      difficultyLevel: Number(difficultyLevel),
      timeToPass: moment.duration(timeToPass, 'days').asSeconds(),
      ...body,
    });
  };

  const initialFormValues = {
    title: title ?? '',
    purpose: purpose ?? '',
    description: description ?? '',
    difficultyLevel: difficultyLevel?.toString() ?? '1',
    timeToPass: timeToPass
      ? moment.duration(timeToPass, 'seconds').asDays()
      : 1,
  };
  const checkObjectsEquality = useAreObjectsEqual(initialFormValues);
  const [isDisabledSubmitButton, setDisabledSubmitButton] = useState(false);
  const formik = useFormik<TAlterCourseInputs>({
    initialValues: initialFormValues,
    validateOnBlur: false,
    validationSchema: toFormikValidationSchema(alterCourseSchema),
    onSubmit: (data) =>
      id
        ? onCourseUpdate(data as TInitialValues)
        : onCourseCreate(data as TInitialValues),
  });

  const { values, touched, errors, handleSubmit, handleChange } = formik;

  useEffect(() => {
    const { file, ...restValues } = formik.values;
    const noChange = checkObjectsEquality(restValues);
    setDisabledSubmitButton(file?.size ? false : noChange);
  }, [JSON.stringify(formik.values), JSON.stringify(initialFormValues)]);

  useEffect(() => {
    if (isSuccessCreate && createData) {
      notify('Курс створено!', 'success');
      router.push(`/course/${createData.id}/edit`);
    } else if (isSuccessUpdate) notify('Курс оновлено!', 'success');
  }, [isSuccessCreate, isSuccessUpdate]);

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
          <FormikProvider value={formik}>
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
                    existingImageUrl={image}
                    name={'file'}
                    label={'Upload Image'}
                  />
                  <DefaultButton
                    isLoading={isLoadingCreate || isLoadingUpdate}
                    isDisabled={id ? isDisabledSubmitButton : false}
                    w={'fit-content'}>
                    {id ? 'Оновити курс' : 'Створити курс'}
                  </DefaultButton>
                </VStack>
              </Flex>
            </form>
          </FormikProvider>
        </Flex>
      </Flex>
    </Center>
  );
};

type TCourseProgramProps = Nullable<Pick<TCourseResponse, 'sections' | 'id'>>;

const CourseProgram: FC<TCourseProgramProps> = ({ sections, id }) => {
  if (!sections || !id) return null;

  return (
    <Center>
      <Flex
        p='5'
        alignItems='center'
        flexDirection='column'
        justifyItems='space-evenly'
        w={'full'}
        {...ContainerOptions}>
        <Heading>Програма курсу</Heading>
        <Accordion
          allowMultiple
          w={'full'}
          pt={7}>
          <Stack spacing={3}>
            {sections.map((section, i) => (
              <SectionItem
                index={i + 1}
                key={section.id}
                {...section}
              />
            ))}
          </Stack>
          <Flex
            my={3}
            alignItems={'center'}
            justifyContent={'center'}>
            <CreateSectionButton courseId={id} />
          </Flex>
        </Accordion>
      </Flex>
    </Center>
  );
};
