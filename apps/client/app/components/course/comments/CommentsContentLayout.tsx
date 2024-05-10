import React, { FC } from 'react';
import {
  Center,
  useColorModeValue,
  Box,
  IconButton,
  Flex,
  Text,
  Select,
  Avatar,
  Divider,
  Input,
  Button,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../../lib/hooks/redux';
import { CommentsContent } from './CommentsContent';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';

type TProps = {
  imageUrl: string;
  quantityComment: number;
};

export const CommentsContentLayout: FC<TProps> = ({
  imageUrl,
  quantityComment,
}) => {
  const backgroundColor = useColorModeValue('#F3F4FD', '#2B2C45');
  const user = useTypedSelector((state) => state.user);
  return (
    <>
      <Center bg={backgroundColor}>
        <Box
          p='25px'
          maxWidth={1200}
          w={'full'}>
          <Box
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            mb='20px'
            gap='10px'>
            <IconButton
              colorScheme='purple'
              aria-label='Done'
              size='md'
              icon={<FaChevronLeft />}
            />
            <IconButton
              colorScheme='purple'
              aria-label='Done'
              size='md'
              icon={<FaChevronRight />}
            />
          </Box>
          <Flex
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            mb='10px'>
            <Text
              fontSize={{ base: '16', md: '24' }}
              mb={{ base: '2', md: '0' }}
              fontWeight='bold'>
              {quantityComment} Коментарів
            </Text>
            <Select w='fiil-content'>
              <option value='option1'>Найпопулярніші</option>
              <option value='option2'>Спочатку нові</option>
              <option value='option3'>Спочатку старі</option>
            </Select>
          </Flex>
          <Divider
            mb='20px'
            borderWidth='2px'
          />
          <Flex>
            <Avatar
              boxSize='50px'
              src={imageUrl}
              mr='10px'
              borderRadius='10px'
            />
            <Box mb='20px'>
              <Input
                placeholder='Напишіть коментар...'
                mb='10px'
              />
              <Button
                bg='purple.600'
                color='white'
                _hover={{
                  bg: 'purple.800',
                  transitionDuration: '.4s',
                }}
                type='submit'
                variant='outline'>
                Залишити коментар
              </Button>
            </Box>
          </Flex>
          <CommentsContent
            imageUrl=''
            userName={user.name || 'User'}
            userComment='текст текст текст😀'
            likesComment={123}
            dislikesComment={321}></CommentsContent>
        </Box>
      </Center>
    </>
  );
};
