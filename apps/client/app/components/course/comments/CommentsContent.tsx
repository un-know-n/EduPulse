import React, { FC } from 'react';
import { Flex, Text, Heading, Box, Avatar, Stack } from '@chakra-ui/react';
import { BiSolidLike } from 'react-icons/bi';
import { BiSolidDislike } from 'react-icons/bi';

type TProps = {
  imageUrl: string;
  userName: string;
  userComment: string;
  likesComment: number;
  dislikesComment: number;
};

export const CommentsContent: FC<TProps> = ({
  imageUrl,
  userName,
  userComment,
  likesComment,
  dislikesComment,
}) => {
  return (
    <Stack>
      <Flex>
        <Avatar
          boxSize='50px'
          src={imageUrl}
          borderRadius='10px'
          mr='10px'
        />
        <Box>
          <Heading
            size='sm'
            mb='5px'>
            {userName}
          </Heading>
          <Text mb='5px'>{userComment}</Text>
          <Flex>
            <Flex
              alignItems='center'
              mr='15px'>
              <BiSolidLike />
              <Text ml='5px'>{likesComment}</Text>
            </Flex>
            <Flex alignItems='center'>
              <BiSolidDislike />
              <Text ml='5px'>{dislikesComment}</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Stack>
  );
};
