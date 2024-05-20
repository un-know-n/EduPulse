'use client';

import { FC, useState } from 'react';
import {
  Box,
  Checkbox,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { Link } from '@chakra-ui/next-js';
import { ThirdPartyButtons } from '../shared/buttons/ThirdPartyButtons';
import { Routes } from '../../../config/routing/routes';
import { boolean, object, string, TypeOf } from 'zod';
import { emailValidator, passwordValidator } from '../config/validationSchemas';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { EmailFormInput } from '../shared/inputs/EmailFormInput';
import { PasswordFormInput } from '../shared/inputs/PasswordFormInput';
import { RoleFormInput } from '../shared/inputs/RoleFormInput';
import { TextFormInput } from '../../shared/inputs/TextFormInput';
import { signIn } from 'next-auth/react';
import { baseRoles, signInOptions } from '../config/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthAlert from '../shared/alerts/AuthAlert';
import { DefaultButton } from '../shared/buttons/DefaultButton';
import { apiInstance } from '../../../lib/services/api.instance';

const signUpSchema = object({
  name: string({
    required_error: "Введіть ваше ім'я",
  })
    .trim()
    .min(1, {
      message: "Ім'я не може бути порожнім",
    }),
  surname: string({
    required_error: 'Введіть ваше прізвище',
  })
    .trim()
    .min(1, {
      message: 'Прізвище не може бути порожнім',
    }),
  role: string().refine((role) => role === 'student' || role === 'teacher', {
    message: 'Дане поле може бути лише "Студент" або "Викладач"',
  }),
  email: emailValidator,
  password: passwordValidator,
  rememberMe: boolean(),
});
type TSignUpFormInputs = TypeOf<typeof signUpSchema>;
const initialValues = {
  name: '',
  surname: '',
  email: '',
  password: '',
  role: baseRoles[0],
  rememberMe: false,
};
type TInitialValues = typeof initialValues;

export const SignUp: FC = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const callbackUrl = useSearchParams().get('callbackUrl') || Routes.Dashboard;
  const options = signInOptions(callbackUrl);
  const [isChecked, setIsChecked] = useState(false);

  const signUp = async (data: Omit<TInitialValues, 'rememberMe'>) => {
    try {
      const res = await apiInstance.post('/auth/sign-up', {
        name: `${data.name} ${data.surname}`,
        email: data.email,
        role: data.role,
        password: data.password,
      });

      return res.data;
    } catch (e: any) {
      setError(e?.response.data.message);
      return null;
    }
  };

  const onSubmit = async (values: TInitialValues) => {
    const { rememberMe, ...validatedForm } = signUpSchema.parse(values);

    const response = await signUp(validatedForm as TInitialValues);

    if (response) {
      setError('');

      signIn('credentials', {
        email: validatedForm.email,
        password: validatedForm.password,
        ...options,
        redirect: false,
      }).then((value) => {
        if (!value?.error) {
          router.push(callbackUrl);
        } else {
          setError(
            'Сталася неочікувана помилка, спробуйте ввійти в свій обліковий запис вручну',
          );
        }
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <Box
      p='30px'
      w={['auto', 500]}
      color='#1D2734'>
      <Container
        p={0}
        mb={5}>
        <Heading fontSize={32}>Створити обліковий запис</Heading>
        <Text>
          Вже зареєстровані?{' '}
          <Link
            color='purple.500'
            href={Routes.SignIn}>
            Увійти
          </Link>
        </Text>
      </Container>
      {error ? <AuthAlert text={error} /> : null}
      <Box mt={5}>
        <Formik<TSignUpFormInputs>
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(signUpSchema)}
          onSubmit={(data) => onSubmit(data as TInitialValues)}>
          {({ handleSubmit, errors, handleChange, values, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align='flex-start'>
                <Flex
                  gap='3'
                  w='full'>
                  <TextFormInput
                    isInvalid={Boolean(!!errors.name && touched.name)}
                    errorMessage={errors.name ?? ''}
                    fieldName='name'
                    placeholder="Ім'я"
                  />

                  <TextFormInput
                    isInvalid={Boolean(!!errors.surname && touched.surname)}
                    errorMessage={errors.surname ?? ''}
                    fieldName='surname'
                    placeholder='Прізвище'
                  />
                </Flex>
                <RoleFormInput
                  isInvalid={Boolean(!!errors.role && touched.role)}
                  errorMessage={errors.role ?? ''}
                  values={values.role}
                  onChange={handleChange}
                />

                <EmailFormInput
                  isInvalid={Boolean(!!errors.email && touched.email)}
                  errorMessage={errors.email ?? ''}
                />

                <PasswordFormInput
                  isInvalid={Boolean(!!errors.password && touched.password)}
                  errorMessage={errors.password ?? ''}
                />

                <Field
                  as={Checkbox}
                  id='rememberMe'
                  name='rememberMe'
                  colorScheme='purple'
                  onChange={handleCheckboxChange}>
                  <Text>
                    Я погоджуюся з{' '}
                    <Link
                      color='purple.500'
                      href='/'>
                      Політикою конфіденційності
                    </Link>{' '}
                    та{' '}
                    <Link
                      color='purple.500'
                      href='/'>
                      Правилами користування
                    </Link>
                  </Text>
                </Field>
                <DefaultButton isDisabled={!isChecked}>Створити</DefaultButton>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
      <ThirdPartyButtons includeDivider />
    </Box>
  );
};
