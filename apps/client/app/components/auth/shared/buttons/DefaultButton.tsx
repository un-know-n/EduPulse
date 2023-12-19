import { Button, ButtonProps } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

export const DefaultButton: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => {
  return (
    <Button
      borderRadius='15'
      bg='purple.600'
      color='white'
      _hover={{
        bg: 'purple.800',
        transitionDuration: '.4s',
      }}
      type='submit'
      variant='outline'
      width='full'
      {...props}>
      {children}
    </Button>
  );
};
