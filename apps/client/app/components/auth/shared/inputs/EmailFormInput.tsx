import { FC } from 'react';
import { IInputFormProps } from '../@types/IInputFormProps';
import { Field } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { MdAlternateEmail } from 'react-icons/md';

export const EmailFormInput: FC<IInputFormProps> = ({
  isInvalid,
  errorMessage,
}) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <InputGroup>
        <Field
          as={Input}
          id='email'
          name='email'
          type='email'
          variant='outline'
          placeholder='Email Address'
        />
        <InputRightElement
          pointerEvents='none'
          fontSize='1.2em'>
          <MdAlternateEmail />
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
