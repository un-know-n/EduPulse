import React, { FC } from 'react';
import {
  Flex,
  Text,
  Heading,
  Box,
  Avatar,
  Stack,
  IconButton,
  useBoolean,
} from '@chakra-ui/react';
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
  const [isLikeClicked, setIsLikeClicked] = useBoolean();
  const [isDislikeClicked, setIsDislikeClicked] = useBoolean();

  const handleLikeClick = () => {
    setIsLikeClicked.toggle();
    setIsDislikeClicked.off();
  };

  const handleDislikeClick = () => {
    setIsDislikeClicked.toggle();
    setIsLikeClicked.off();
  };

  return (
    <Stack mb='20px'>
      <Flex>
        <Avatar
          boxSize='50px'
          src={imageUrl}
          borderRadius='10px'
          mr='10px'
        />
        <Flex direction='column'>
          <Heading
            size='sm'
            mb='5px'>
            {userName}
          </Heading>
          <Text
            w='50%'
            mb='5px'
            overflowWrap='break-word'>
            {userComment}
          </Text>
          <Flex>
            <Flex
              alignItems='center'
              mr='15px'>
              <IconButton
                icon={<BiSolidLike />}
                aria-label='Liked'
                color={isLikeClicked ? 'purple.600' : 'gray'}
                bg='transparent'
                size='sm'
                fontSize='18px'
                _hover={{ bg: 'transparent' }}
                onClick={handleLikeClick}
              />
              <Text ml='5px'>
                {isLikeClicked ? likesComment + 1 : likesComment}
              </Text>
            </Flex>
            <Flex alignItems='center'>
              <IconButton
                icon={<BiSolidDislike />}
                aria-label='Disliked'
                color={isDislikeClicked ? 'purple.600' : 'gray'}
                bg='transparent'
                size='sm'
                fontSize='18px'
                _hover={{ bg: 'transparent' }}
                onClick={handleDislikeClick}
              />
              <Text ml='5px'>
                {isDislikeClicked ? dislikesComment + 1 : dislikesComment}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  );
};
