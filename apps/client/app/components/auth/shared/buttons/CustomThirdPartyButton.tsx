import { Button, ButtonProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export const CustomThirdPartyButton: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => {
  return (
    <Button
      borderColor='black'
      color='black'
      _hover={{
        bg: 'gray.700',
        color: 'white',
        transitionDuration: '.4s',
      }}
      variant='outline'
      {...props}>
      {children}
    </Button>
  );
};
