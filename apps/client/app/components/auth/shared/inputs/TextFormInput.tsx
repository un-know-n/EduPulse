import { IInputFormProps } from '../@types/IInputFormProps';
import { FC } from 'react';
import { Field } from 'formik';
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';

export const TextFormInput: FC<
  IInputFormProps & { fieldName: string; placeholder: string }
> = ({ isInvalid, errorMessage, fieldName, placeholder }) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <Field
        as={Input}
        id={fieldName}
        name={fieldName}
        type='text'
        variant='outline'
        placeholder={placeholder}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
