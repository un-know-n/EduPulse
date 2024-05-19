import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { FC } from 'react';
import { difficultyLevels } from '../../../auth/config/constants';
import { ISelectFormProps } from './DifficultyFormInput';
import { TCategoriesResponse } from '../../@types/course';

interface ICategoryFormProps extends Omit<ISelectFormProps, 'values'> {
  categories: TCategoriesResponse[];
  values: string | undefined;
}

export const CategoryFormInput: FC<ICategoryFormProps> = ({
  errorMessage,
  isInvalid,
  values,
  fieldName,
  label,
  placeholder,
  categories,
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
        {categories.map(({ id, title }) => (
          <option
            key={id}
            value={id}>
            {title}
          </option>
        ))}
      </Field>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
