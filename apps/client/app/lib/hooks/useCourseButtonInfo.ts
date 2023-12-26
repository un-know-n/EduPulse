import { useEffect, useState } from 'react';
import { checkIfExpired } from '../utils/time';
import { TEnrollment } from '../../components/course/@types/course';
import {
  useAddEnrollmentMutation,
  useResetEnrollmentMutation,
} from '../../store/services/courses';

export const useCourseButtonInfo = (
  courseId: string,
  userId: string,
  enrollment?: TEnrollment,
) => {
  const [addEnrollment, { data, error }] = useAddEnrollmentMutation();
  const [resetEnrollment, { data: resetData, error: errorData }] =
    useResetEnrollmentMutation();
  const [buttonInfo, setButtonInfo] = useState<{
    title: string;
    callback: () => void;
  } | null>(null);

  useEffect(() => {
    if (!enrollment)
      setButtonInfo({
        title: 'Зареєструватися',
        callback: () => addEnrollment({ userId, courseId }),
      });

    if (enrollment) {
      if (enrollment.isCompleted)
        setButtonInfo({
          title: 'Отримати сертифікат',
          callback: () => {},
        });

      if (checkIfExpired(enrollment.expiresAt))
        setButtonInfo({
          title: 'Пройти знову',
          callback: () => resetEnrollment(enrollment.id),
        });
    }
  }, [enrollment]);

  return buttonInfo;
};
