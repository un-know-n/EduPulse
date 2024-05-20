import { FC, PropsWithChildren } from 'react';
import {
  Box,
  HStack,
  RadioProps,
  useRadio,
  useRadioGroup,
  UseRadioProps,
} from '@chakra-ui/react';

import { translateRole, TRoles } from '../../auth/config/constants';

interface IProps extends RadioProps {
  options: TRoles[];
  defaultChosenRole: string;
  onChooseRole: (role: TRoles) => void;
}

export const RoleRadioGroup: FC<IProps> = ({
  defaultChosenRole,
  options,
  onChooseRole,
  ...props
}) => {
  const { getRadioProps } = useRadioGroup({
    name: 'role',
    defaultValue: defaultChosenRole,
    onChange: (value) => onChooseRole(value as TRoles),
  });

  return (
    <HStack>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard
            key={value}
            {...radio}>
            {translateRole(value)}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: PropsWithChildren<UseRadioProps>) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box
      as='label'
      w='100%'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'blue.600',
          color: 'white',
          borderColor: 'blue.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}>
        {props.children}
      </Box>
    </Box>
  );
}
