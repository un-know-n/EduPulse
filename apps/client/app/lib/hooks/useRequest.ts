import { useNotify } from './useNotify';
import jwt from 'jsonwebtoken';
import { apiInstance } from '../services/api.instance';
import { UserType } from '../../config/@types/next-auth';
import { AxiosRequestConfig } from 'axios';

export const useRequest = () => {
  const notify = useNotify();

  return async <T>(
    user: UserType,
    url: string,
    method: AxiosRequestConfig['method'],
    config?: AxiosRequestConfig,
  ) => {
    try {
      const userToken = await jwt.sign(
        user,
        process.env.NEXT_PUBLIC_TOKEN_SECRET ?? '',
      );

      const { data } = await apiInstance.request<T>({
        url: url,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        method,
        ...config,
      });

      return data;
    } catch (e: any) {
      const errorMessage =
        e?.response?.data?.message || 'Unknown error occurred!';
      notify(errorMessage, 'error');
      throw new Error(errorMessage);
    }
  };
};
