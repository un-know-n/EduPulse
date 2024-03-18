import React, { FC } from 'react';
import { Text, Stack, AspectRatio } from '@chakra-ui/react';

type TProps = {
  videoURL: string;
  materialContent: string;
};

export const CardVideo: FC<TProps> = ({ videoURL, materialContent }) => {
  return (
    <Stack>
      <AspectRatio
        mt='10px'
        maxW='560px'>
        <iframe
          src={videoURL}
          allowFullScreen
        />
      </AspectRatio>
      <Text fontSize='16'>{materialContent}</Text>
    </Stack>
  );
};
