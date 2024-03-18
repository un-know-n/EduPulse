import React, { FC } from 'react';
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { PiCertificateFill } from 'react-icons/pi';

interface Certificate {
  title: string;
  completion: number;
  color: string;
}

interface CertificateListProps {
  certificates: Certificate[];
}

export const CertificateList: FC<CertificateListProps> = ({ certificates }) => {
  return (
    <Box w={'full'}>
      <List
        spacing='15px'
        borderWidth='1px'
        p='5'>
        {certificates.map((certificate, index) => (
          <ListItem key={index}>
            <Flex alignItems='center'>
              <ListIcon
                as={PiCertificateFill}
                color={certificate.color}
                boxSize='40px'
              />
              <Flex direction='column'>
                <Text
                  fontSize='16'
                  fontWeight='600'>
                  {certificate.title}
                </Text>
                <Text fontSize='12'>{certificate.completion}% пройдено</Text>
              </Flex>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
