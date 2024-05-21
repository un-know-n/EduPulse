import React, { FC, useState } from 'react';
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { PiCertificateFill } from 'react-icons/pi';
import { useTypedSelector } from 'apps/client/app/lib/hooks/redux';
import { TCertificateResponse } from '../../course/@types/course';
import NoCertificatesPoster from '../../shared/posters/NoCertificatesPoster';
import { CertificateModal } from '../../shared/certificate/modals/CertificateModal';

type TProps = {
  certificates: TCertificateResponse[];
};

export const CertificateList: FC<TProps> = ({ certificates }) => {
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
      {certificates.length ? (
        <>
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
            <CertificateModal
              isOpen={!!selectedCertificate}
              onClose={handleCloseModal}
              selectedCertificate={selectedCertificate}
            />
          )}
        </>
      ) : (
        <NoCertificatesPoster />
      )}
    </Box>
  );
};
