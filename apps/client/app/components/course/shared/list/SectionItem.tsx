import React, { FC, useEffect, useMemo } from 'react';
import { TSectionResponse } from '../../@types/course';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
  useColorModeValue,
  useConst,
} from '@chakra-ui/react';
import { LectureItem } from './LectureItem';
import { UpdateSectionButton } from '../buttons/section/UpdateSectionButton';

import { DeleteSectionButton } from '../buttons/section/DeleteSectionButton';
import { CreateMaterialButton } from '../buttons/general/CreateMaterialButton';
import { TestItem } from './TestItem';
import { MaterialTypes } from '../../config/constants';
import { getSortedMaterialItems } from 'apps/client/app/lib/utils/getSortedMaterialItems';

export const SectionItem: FC<TSectionResponse & { index: string | number }> = ({
  id,
  courseId,
  title,
  lectures,
  tests,
  index,
}) => {
  const backgroundColor = useColorModeValue('#F3F4FD', '#282B41');
  const materials = useMemo(
    () => getSortedMaterialItems(lectures, tests),
    [lectures, tests],
  );

  const defineMaterial = (material: (typeof materials)[0], i: number) => {
    // console.log('MATERIAL PROPS: ', material, 'INDEX: ', index);

    if (
      material.type === MaterialTypes.LECTURE ||
      material.type === MaterialTypes.VIDEO
    )
      return (
        <LectureItem
          index={`${index}.${i + 1}`}
          key={material.id}
          bgColor={backgroundColor}
          {...material}
        />
      );
    else
      return (
        <TestItem
          index={`${index}.${i + 1}`}
          key={material.id}
          bgColor={backgroundColor}
          {...material}
        />
      );
  };

  // useEffect(() => {
  //   console.log('LECTURES: ', lectures, 'TESTS: ', tests);
  // });

  return (
    <AccordionItem border='none'>
      <h2>
        <AccordionButton
          as={Box}
          cursor={'pointer'}
          bg={backgroundColor}
          borderRadius={8}>
          <Box
            as='span'
            flex='1'
            textAlign='left'
            noOfLines={2}>
            {index}. {title}
          </Box>
          <Flex
            justifyContent='center'
            alignItems='center'
            gap={3}>
            <AccordionIcon />
            <UpdateSectionButton
              title={title}
              courseId={courseId}
              id={id}
            />
            <DeleteSectionButton sectionId={id} />
          </Flex>
        </AccordionButton>
      </h2>
      <AccordionPanel
        p={0}
        pt={2}>
        <Stack
          pl={6}
          mt={1}
          spacing={3}>
          {materials.map((material, i) => defineMaterial(material, i))}
        </Stack>
        <Flex
          my={3}
          alignItems={'center'}
          justifyContent={'center'}>
          <CreateMaterialButton sectionId={id} />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
