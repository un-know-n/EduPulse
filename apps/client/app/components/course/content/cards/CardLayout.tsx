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
import { MaterialTypes } from '../../config/constants';

type TProps = {
  title: string;
  //type: keyof typeof MaterialTypes;
};

export const CardLayout: FC<PropsWithChildren<TProps>> = ({
  title,
  //type,
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
          <Heading size='md'>{title}</Heading>
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
          {/* <Heading
            size='18'
            textTransform='uppercase'>
            {type === 'LECTURE'
              ? 'Лекція'
              : type === 'VIDEO'
              ? 'Відео'
              : 'Тест'}
          </Heading> */}
          {children}
        </Box>
      </CardBody>
    </Card>
  );
};
