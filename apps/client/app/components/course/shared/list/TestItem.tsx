import { Flex, Box, Text } from '@chakra-ui/react';

import { FC } from 'react';
import { TTestResponse } from '../../@types/course';

import { UpdateTestButton } from '../buttons/test/UpdateTestButton';
import { DeleteTestButton } from '../buttons/test/DeleteTestButton';
import { FaPencilAlt } from 'react-icons/fa';
import { MaterialIcon } from '../icons/MaterialIcon';

export const TestItem: FC<
  TTestResponse & { bgColor?: string; index: string | number }
> = ({ id, index, bgColor, ...props }) => {
  return (
    <Flex
      w={'full'}
      bgColor={bgColor}
      borderRadius={8}
      flexDirection={'column'}
      alignItems={'flex-start'}
      px={3}
      py={2}>
      <Flex
        w={'full'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Flex
          alignItems={'center'}
          gap={3}>
          <MaterialIcon type='TEST' />
          <Text>{props.title}</Text>
        </Flex>
        <Box>
          <UpdateTestButton
            id={id}
            {...props}
          />
          <DeleteTestButton
            testId={id}
            ml={3}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
