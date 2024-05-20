import React, { FC, useState } from 'react';
import {
  Box,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
} from '@chakra-ui/react';
import { PiCertificateFill } from 'react-icons/pi';
import CertificateGenerator from './CertificateGenerator';
import { useTypedSelector } from 'apps/client/app/lib/hooks/redux';
import { TCertificateResponse } from '../../course/@types/course';
import moment from 'moment';

type TProps = {
  certificates: TCertificateResponse[];
};

export const CertificateList: FC<TProps> = ({ certificates }) => {
  const user = useTypedSelector((state) => state.user);

  const [selectedCertificate, setSelectedCertificate] =
    useState<TCertificateResponse | null>(null);

  const handleCertificateClick = (certificate: TCertificateResponse) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  const getColor = (completion: number): string => {
    if (completion >= 90) {
      return '#5EBD32';
    } else {
      return '#FBBC04';
    }
  };

  return (
    <Box w={'full'}>
      <List
        spacing='15px'
        borderWidth='1px'
        p='5'>
        {certificates.map((certificate, index) => (
          <ListItem
            key={index}
            onClick={() => handleCertificateClick(certificate)}
            _hover={{ cursor: 'pointer' }}>
            <Flex alignItems='center'>
              <ListIcon
                as={PiCertificateFill}
                color={getColor(certificate.mark)}
                boxSize='40px'
              />
              <Flex direction='column'>
                <Text
                  onClick={() => handleCertificateClick(certificate)}
                  _hover={{ textDecoration: 'underline' }}
                  fontSize='16'
                  fontWeight='600'>
                  {certificate.title}
                </Text>
                <Text fontSize='12'>{certificate.mark}% пройдено; </Text>
                <Text fontSize='12'>Викладач: {certificate.author}</Text>
              </Flex>
            </Flex>
          </ListItem>
        ))}
      </List>
      {selectedCertificate && (
        <Modal
          size={{ base: 'xs', md: 'md' }}
          isOpen={!!selectedCertificate}
          onClose={handleCloseModal}>
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
              <CertificateGenerator
                title={selectedCertificate.title}
                completion={selectedCertificate.mark}
                user={user.name}
                dateIssue={moment().format('DD.MM.YYYY')}
                author={selectedCertificate.author}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};
