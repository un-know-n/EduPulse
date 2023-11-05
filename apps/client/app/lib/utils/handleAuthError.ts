import { NextAuthErrorDictionary } from '../../config/UI/nextAuthErrorDictionary';

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
