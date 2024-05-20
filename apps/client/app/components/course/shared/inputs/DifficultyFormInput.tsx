import { FC } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { difficultyLevels } from '../../../auth/config/constants';
import { IInputFormProps } from '../../../auth/shared/@types/IInputFormProps';

export interface ISelectFormProps extends IInputFormProps {
  values: number;
  onChange: (...args: any) => void;
  fieldName: string;
  placeholder?: string;
  label?: string;
}

export const DifficultyFormInput: FC<ISelectFormProps> = ({
  errorMessage,
  isInvalid,
  values,
  fieldName,
  label,
  placeholder,
  onChange,
}) => {
  return (
    <FormControl isInvalid={isInvalid}>
      {label ? <FormLabel htmlFor={fieldName}>{label}</FormLabel> : null}
      <Field
        as={Select}
        id={fieldName}
        name={fieldName}
        value={values}
        onChange={onChange}
        placeholder={placeholder ?? ''}
        variant='outline'>
        {difficultyLevels.map((level, i) => (
          <option
            key={i + 1}
            value={i + 1}>
            {level}
          </option>
        ))}
      </Field>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
