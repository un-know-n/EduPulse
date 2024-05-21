import React, { FC, useState } from 'react';
import {
  TCertificateResponse,
  TCourseResponse,
  TEnrollment,
} from '../../@types/course';
import { useTypedSelector } from '../../../../lib/hooks/redux';
import { useCourseButtonInfo } from '../../../../lib/hooks/useCourseButtonInfo';
import { DefaultButton } from '../../../auth/shared/buttons/DefaultButton';
import { Link } from '@chakra-ui/next-js';
import { coursePrefix } from '../../../../config/routing/routes';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { CertificateModal } from '../../../shared/certificate/modals/CertificateModal';

type TProps = Pick<TCourseResponse, 'id' | 'creatorId'> & {
  enrollment?: TEnrollment;
  certificate?: TCertificateResponse;
};

export const CourseButton: FC<TProps & ButtonProps> = ({
  enrollment,
  id,
  creatorId,
  certificate,
  ...props
}) => {
  const user = useTypedSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonInfo = useCourseButtonInfo(id, user.id, onOpen, enrollment);

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
      {certificate && (
        <CertificateModal
          isOpen={isOpen}
          onClose={onClose}
          selectedCertificate={certificate}
        />
      )}
    </>
  );
};
