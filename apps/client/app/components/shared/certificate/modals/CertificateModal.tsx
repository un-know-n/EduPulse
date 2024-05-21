import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { FC } from 'react';

import { TCertificateResponse } from '../../../course/@types/course';
import { useTypedSelector } from 'apps/client/app/lib/hooks/redux';
import GenerateCertificateButton from '../buttons/GenerateCertificateButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedCertificate: TCertificateResponse;
};

export const CertificateModal: FC<Props> = ({
  selectedCertificate,
  isOpen,
  onClose,
}) => {
  const user = useTypedSelector((state) => state.user);

  return (
    <Modal
      size={{ base: 'xs', md: 'md' }}
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Отримання сертифікату</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            spacing='5px'
            textAlign={'center'}>
            <Text
              fontSize={'20px'}
              fontWeight={'medium'}>
              Вітаємо із завершенням курсу!
            </Text>
            <Text
              fontSize={'24px'}
              fontWeight={'bold'}>
              «{selectedCertificate.title}»
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <GenerateCertificateButton
            title={selectedCertificate.title}
            completion={selectedCertificate.mark}
            user={user.name}
            dateIssue={moment().format('DD.MM.YYYY')}
            author={selectedCertificate.author}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
