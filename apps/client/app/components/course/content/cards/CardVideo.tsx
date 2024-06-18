import React, { FC } from 'react';
import { Text, Stack, AspectRatio } from '@chakra-ui/react';
import ReactPlayer from 'react-player';

type TProps = {
  videoURL: string;
  materialContent: string;
};

export const CardVideo: FC<TProps> = ({ videoURL, materialContent }) => {
  return (
    <Stack>
      <ReactPlayer
        width='100%'
        url={videoURL}
        controls
        pip
        light
      />
      <Text fontSize='16'>{materialContent}</Text>
    </Stack>
  );
};
