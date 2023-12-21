import { useToast, UseToastOptions } from '@chakra-ui/react';
import { defaultToastOptions } from '../../config/UI/toast.options';

export const useNotify = () => {
  const toast = useToast();

  const notify = (message: string, status: UseToastOptions['status'] = 'info') => {
    toast({
      title: message,
      ...defaultToastOptions,
      duration: 5000,
      status,
    });
  }

  return notify;
}
