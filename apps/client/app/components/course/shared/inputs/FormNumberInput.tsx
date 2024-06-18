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

interface IProps extends NumberInputProps {
  fieldName: string;
  placeholder?: string;
  label?: string;
  // value: number;
  isInvalid: boolean;
  errorMessage: string;
  min: number;
  max: number;
}

export const FormNumberInput: FC<IProps> = ({
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
        min={min}
        max={max}
        {...props}
        onChange={(value) => {
          const numberValue = parseInt(value);
          const parsedValue = Number.isNaN(numberValue) ? min : numberValue;
          // if (value > max -> max || value < min -> min) OR GIVEN VALUE
          const transformedValue =
            parsedValue < min ? min : parsedValue > max ? max : parsedValue;

          setValue(transformedValue);
        }}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
