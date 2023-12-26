import { Box, BoxProps, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

type TProps = {
  title: string;
  description: string;
  icon: ReactElement;
};

export const DefaultPosterLayout: FC<TProps & BoxProps> = ({
  description,
  title,
  icon,
  ...props
}) => {
  return (
    <Box
      h={'full'}
      w={'full'}
      {...props}>
      <Center>
        <Flex
          h={'full'}
          flexWrap='wrap'
          alignItems='center'
          justifyContent='center'
          gap='0.5rem'
          direction='column'
          maxWidth='200px'
          mt={10}>
          <Heading fontSize='1rem'>{title}</Heading>
          <Text textAlign='center'>{description}</Text>
          {icon}
        </Flex>
      </Center>
    </Box>
  );
};
