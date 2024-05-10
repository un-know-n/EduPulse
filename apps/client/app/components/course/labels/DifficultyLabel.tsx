import React, { FC } from 'react';
import {
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdSignalCellular3Bar,
} from 'react-icons/md';
import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';

export type TDifficultyLevel = 1 | 2 | 3;
type TProps = {
  level: TDifficultyLevel;
  showText?: boolean;
};

export const levelsDictionary: {
  [key: number]: { icon: React.ReactElement; text: string };
} = {
  1: {
    icon: <MdSignalCellular1Bar color='5EBD32' />,
    text: 'Простий рівень',
  },
  2: {
    icon: <MdSignalCellular2Bar color='FBBC04' />,
    text: 'Середній рівень',
  },
  3: {
    icon: <MdSignalCellular3Bar color='C64646' />,
    text: 'Складний рівень',
  },
};

export const DifficultyLabel: FC<TProps> = ({ level, showText = true }) => {
  const iconSize = useBreakpointValue({ base: '15px', md: '20px' });

  return (
    <Flex align='center'>
      {React.cloneElement(levelsDictionary[level].icon, {
        size: iconSize,
      })}
      {showText ? <Text ml='10px'>{levelsDictionary[level].text}</Text> : null}
    </Flex>
  );
};
