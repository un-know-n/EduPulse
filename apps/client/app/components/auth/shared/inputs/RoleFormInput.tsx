import { FC } from 'react';
import { Field } from 'formik';
import { FormControl, FormErrorMessage, Select } from '@chakra-ui/react';
import { IRoleFormProps } from '../@types/IRoleFormProps';

export const baseRoles = ['student', 'teacher'] as const;

export const RoleFormInput: FC<IRoleFormProps> = ({
  errorMessage,
  isInvalid,
  values,
  onChange,
}) => {
  return (
    <FormControl isInvalid={isInvalid}>
      <Field
        as={Select}
        id='role'
        name='role'
        value={values}
        onChange={onChange}
        variant='outline'>
        {baseRoles.map((role) => (
          <option
            key={role}
            value={role}>
            {role}
          </option>
        ))}
      </Field>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
