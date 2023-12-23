import { FC } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useField } from 'formik';

interface ITimeToPassFormProps extends NumberInputProps {
  fieldName: string;
  placeholder?: string;
  label?: string;
  value: number;
  isInvalid: boolean;
  errorMessage: string;
  min: number;
  max: number;
}

export const TimeToPassFormInput: FC<ITimeToPassFormProps> = ({
  errorMessage,
  isInvalid,
  fieldName,
  label,
  onChange,
  placeholder,
  min,
  max,
  ...props
}) => {
  const [field, meta, helpers] = useField(fieldName);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <FormControl isInvalid={isInvalid}>
      {label ? <FormLabel htmlFor={fieldName}>{label}</FormLabel> : null}
      <NumberInput
        {...field}
        id={fieldName}
        size='md'
        placeholder={placeholder ?? ''}
        variant={'outline'}
        value={props.value}
        maxW={24}
        min={min}
        max={max}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper
            onClick={() => (value + 1 <= max ? setValue(value + 1) : null)}
          />
          <NumberDecrementStepper
            onClick={() => (value - 1 >= min ? setValue(value - 1) : null)}
          />
        </NumberInputStepper>
      </NumberInput>

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
