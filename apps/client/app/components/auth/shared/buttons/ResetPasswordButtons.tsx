import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Routes } from '../../../../config/routing/routes';
import { DefaultButton } from './DefaultButton';

type TProps = {
  switchToResendButton?: boolean;
  resendHandler?: () => void;
};

export const ResetPasswordButtons: FC<TProps> = ({
  switchToResendButton = false,
  resendHandler = () => 0,
}) => {
  return (
    <Flex
      w='full'
      flexDirection='column'
      gap={2}>
      {switchToResendButton ? (
        <DefaultButton onClick={resendHandler}>
          Надіслати повторно
        </DefaultButton>
      ) : (
        <DefaultButton>Підтвердити</DefaultButton>
      )}

      <Link
        href={Routes.SignIn}
        py={2}
        _hover={{
          color: 'white',
          backgroundColor: 'purple.800',
          transitionDuration: '.4s',
          transitionTimingFunction: 'ease-in-out',
        }}
        fontWeight='medium'
        border='1px'
        borderRadius={15}
        textAlign='center'
        width='full'
        variant='outline'>
        Повернутися до авторизації
      </Link>
    </Flex>
  );
};
