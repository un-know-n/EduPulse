import { useEffect, useState } from 'react';
import { checkIfExpired } from '../utils/time';
import { TEnrollment } from '../../components/course/@types/course';
import {
  useAddEnrollmentMutation,
  useResetEnrollmentMutation,
} from '../../store/services/courses';
import { useRouter } from 'next/navigation';
import { coursePrefix } from '../../config/routing/routes';
import { useShowError } from './useShowError';

export const useCourseButtonInfo = (
  courseId: string,
  userId: string,
  handleCertificateModalOpen: () => void,
  enrollment?: TEnrollment,
) => {
  const router = useRouter();
  const [addEnrollment, { data, error, isLoading: isLoadingEnrollment }] =
    useAddEnrollmentMutation();
  const [
    resetEnrollment,
    { data: resetData, error: errorData, isLoading: isLoadingResetEnrollment },
  ] = useResetEnrollmentMutation();
  useShowError(error, false);
  useShowError(errorData, false);
  const [buttonInfo, setButtonInfo] = useState<{
    title: string;
    callback: () => void;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isLoadingEnrollment || isLoadingResetEnrollment);
  }, [isLoadingEnrollment, isLoadingResetEnrollment]);

  useEffect(() => {
    if (!enrollment)
      return setButtonInfo({
        title: 'Зареєструватися',
        callback: () => addEnrollment({ userId, courseId }),
      });

    if (enrollment) {
      if (checkIfExpired(enrollment.expiresAt) || enrollment.isFailed)
        return setButtonInfo({
          title: 'Пройти знову',
          callback: () => resetEnrollment(enrollment.id),
        });

      if (enrollment.isCompleted) {
        return setButtonInfo({
          title: 'Сертифікат',
          callback: () => handleCertificateModalOpen(),
        });
      } else {
        return setButtonInfo({
          title: 'Матеріали',
          callback: () => router.push(`${coursePrefix}/${courseId}/content`),
        });
      }
    }
  }, [enrollment]);

  return { buttonInfo, isLoading };
};
