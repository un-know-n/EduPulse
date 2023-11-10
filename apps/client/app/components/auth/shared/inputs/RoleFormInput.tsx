import { FC } from 'react';
import { Field } from 'formik';
import { FormControl, FormErrorMessage, Select } from '@chakra-ui/react';
import { IRoleFormProps } from '../@types/IRoleFormProps';
import { baseRoles, translateRole } from '../../config/constants';

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
            {translateRole(role)}
          </option>
        ))}
      </Field>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
