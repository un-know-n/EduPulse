import { NextAuthErrorDictionary } from '../../config/UI/nextAuthErrorDictionary';
import { UseToastOptions } from '@chakra-ui/react';
import { defaultToastOptions } from '../../config/UI/toast.options';

export const notifyAboutAuthError = (
  errorQueryParameter: string,
  toastCallback: (error: string) => void,
) => {
  const describedError =
    NextAuthErrorDictionary[
      errorQueryParameter as keyof typeof NextAuthErrorDictionary
    ];
  toastCallback(describedError);
};
