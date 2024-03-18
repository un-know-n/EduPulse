import React, { FC, useState, PropsWithChildren } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Card,
  CardBody,
  Heading,
  Box,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

type TProps = {
  materialName: string;
  materialType: string;
};

export const CardLayout: FC<PropsWithChildren<TProps>> = ({
  materialName,
  materialType,
  children,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <Card>
      <CardBody>
        <Box>
          <Heading size='md'>{materialName}</Heading>
          <Flex
            alignItems='center'
            mb='20px'>
            <IconButton
              aria-label='Done'
              icon={<FaStar />}
              onClick={handleClick}
              color={isClicked ? 'purple.500' : 'inherit'}
              bg={isClicked ? 'transparent' : 'inherit'}
              _hover={{ bg: 'transparent' }}
            />
            <Text>Додати цю сторінку в закладки</Text>
          </Flex>
          <Heading
            size='18'
            textTransform='uppercase'>
            {materialType}
          </Heading>
          {children}
        </Box>
      </CardBody>
    </Card>
  );
};
