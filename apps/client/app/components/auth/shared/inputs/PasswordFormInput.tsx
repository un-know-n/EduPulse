import { FC, useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IInputFormProps } from '../@types/IInputFormProps';

export const PasswordFormInput: FC<
  IInputFormProps & { forConfirmation?: boolean; passwordValue?: string }
> = ({
  errorMessage,
  isInvalid,
  forConfirmation = false,
  passwordValue = '',
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={isInvalid}>
      <InputGroup>
        {forConfirmation ? (
          <Field
            as={Input}
            id='confirmPassword'
            name='confirmPassword'
            type={show ? 'text' : 'password'}
            variant='outline'
            placeholder='Підтвердіть пароль'
            validate={(value: string) => {
              let error;

              if (value !== passwordValue) {
                error = `Паролі не співпадають!`;
              }

              return error;
            }}
          />
        ) : (
          <Field
            as={Input}
            id='password'
            name='password'
            type={show ? 'text' : 'password'}
            variant='outline'
            placeholder='Пароль'
          />
        )}

        <InputRightElement mr={0.5}>
          <IconButton
            size='sm'
            aria-label='Show password'
            backgroundColor='transparent'
            fontSize='20px'
            onClick={handleClick}
            icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}></IconButton>
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
