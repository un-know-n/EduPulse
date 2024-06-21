import { FC } from 'react';
import { IInputFormProps } from '../../../auth/shared/@types/IInputFormProps';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { Field } from 'formik';

export const TextareaFormInput: FC<
  IInputFormProps & {
    fieldName: string;
    placeholder?: string;
    label?: string;
  } & TextareaProps
> = ({ isInvalid, errorMessage, fieldName, placeholder, label, ...props }) => {
  return (
    <FormControl isInvalid={isInvalid}>
      {label ? <FormLabel htmlFor={fieldName}>{label}</FormLabel> : null}
      <Field
        as={Textarea}
        id={fieldName}
        name={fieldName}
        type='text'
        variant='outline'
        placeholder={placeholder ?? ''}
        {...props}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
