import { IInputFormProps } from '../../auth/shared/@types/IInputFormProps';
import { FC } from 'react';
import { Field } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export const TextFormInput: FC<
  IInputFormProps & { fieldName: string; placeholder?: string; label?: string }
> = ({ isInvalid, errorMessage, fieldName, placeholder, label }) => {
  return (
    <FormControl isInvalid={isInvalid}>
      {label ? <FormLabel htmlFor={fieldName}>{label}</FormLabel> : null}
      <Field
        as={Input}
        id={fieldName}
        name={fieldName}
        type='text'
        variant='outline'
        placeholder={placeholder ?? ''}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
