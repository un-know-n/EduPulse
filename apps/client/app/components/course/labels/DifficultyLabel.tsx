import React, { FC } from 'react';
import {
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdSignalCellular3Bar,
} from 'react-icons/md';
import { Flex, Text } from '@chakra-ui/react';

export type TDifficultyLevel = 1 | 2 | 3;
type TProps = {
  level: TDifficultyLevel;
  showText?: boolean;
};

export const levelsDictionary: {
  [key: number]: { icon: React.ReactElement; text: string };
} = {
  1: {
    icon: (
      <MdSignalCellular1Bar
        size='20px'
        color='5EBD32'
      />
    ),
    text: 'Простий рівень',
  },
  2: {
    icon: (
      <MdSignalCellular2Bar
        size='20px'
        color='FBBC04'
      />
    ),
    text: 'Середній рівень',
  },
  3: {
    icon: (
      <MdSignalCellular3Bar
        size='20px'
        color='C64646'
      />
    ),
    text: 'Складний рівень',
  },
};

export const DifficultyLabel: FC<TProps> = ({ level, showText = true }) => {
  return (
    <Flex align='center'>
      {levelsDictionary[level].icon}
      {showText ? <Text ml='10px'>{levelsDictionary[level].text}</Text> : null}
    </Flex>
  );
};
