import { useToast } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { defaultToastOptions } from '../../config/UI/toast.options';
import { notifyAboutAuthError } from '../utils/handleAuthError';

const useShowError = () => {
  const toast = useToast();

  const error = useSearchParams().get('error');

  useEffect(() => {
    if (error)
      notifyAboutAuthError(error, (error) =>
        toast({
          title: error,
          ...defaultToastOptions,
          duration: 10000,
          status: 'error',
        }),
      );
  }, [error]);

  return error;
};

export default useShowError;
