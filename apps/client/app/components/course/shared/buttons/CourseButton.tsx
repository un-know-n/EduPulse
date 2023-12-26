import React, { FC } from 'react';
import { TCourseResponse, TEnrollment } from '../../@types/course';
import { useTypedSelector } from '../../../../lib/hooks/redux';
import { useCourseButtonInfo } from '../../../../lib/hooks/useCourseButtonInfo';
import { DefaultButton } from '../../../auth/shared/buttons/DefaultButton';
import { Link } from '@chakra-ui/next-js';
import { coursePrefix } from '../../../../config/routing/routes';
import { ButtonProps } from '@chakra-ui/react';

type TProps = Pick<TCourseResponse, 'id' | 'creatorId'> & {
  enrollment?: TEnrollment;
};

export const CourseButton: FC<TProps & ButtonProps> = ({
  enrollment,
  id,
  creatorId,
  ...props
}) => {
  const user = useTypedSelector((state) => state.user);
  const buttonInfo = useCourseButtonInfo(id, user.id, enrollment);

  return (
    <>
      {user.id === creatorId ? (
        <DefaultButton
          as={Link}
          href={`${coursePrefix}/${id}/edit`}
          _hover={{
            textDecoration: 'none',
          }}
          w={'fit-content'}
          {...props}>
          Оновити курс
        </DefaultButton>
      ) : (
        <DefaultButton
          w={'fit-content'}
          {...props}
          onClick={buttonInfo?.callback}>
          {buttonInfo?.title}
        </DefaultButton>
      )}
    </>
  );
};
