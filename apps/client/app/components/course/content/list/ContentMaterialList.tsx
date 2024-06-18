import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from '@chakra-ui/react';
import React, { FC } from 'react';

import { MaterialTypes } from '../../config/constants';
import { Link } from '@chakra-ui/next-js';
import { MaterialIcon } from '../../shared/icons/MaterialIcon';
import useMaterialsSlider from 'apps/client/app/lib/hooks/useMaterialsSlider';
import { useSearchParams } from 'next/navigation';
import { useMaterials } from 'apps/client/app/lib/hooks/useMaterials';

type Props = {
  courseId: string;
  sections: TSection[];
};

export type TSection = {
  title: string;
  id: string;
  materials: TMaterial[];
};

export type TMaterial = {
  title: string;
  type: keyof typeof MaterialTypes;
  id: string;
};

export const ContentMaterialList: FC<Props> = ({ sections, courseId }) => {
  const { colorMode } = useColorMode();
  const { materials, setMaterialIndex, selectedMaterial } = useMaterials({
    sections,
  });

  const handleMaterialClick = (materialId: string) => {
    const materialIndex = materials.find(
      (material) => material.material.id === materialId,
    )?.materialIndex;

    setMaterialIndex(materialIndex ?? 0);
  };

  return (
    <Box>
      <Box
        position='relative'
        mt={10}
        mb={5}>
        <Divider />
        <AbsoluteCenter
          bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
          borderRadius={5}
          px='4'>
          Матеріали
        </AbsoluteCenter>
      </Box>
      <List spacing='20px'>
        {sections.map(({ materials, title, id: sectionId }, index) => (
          <ListItem key={index}>
            <Text fontWeight='bold'>{`${index + 1}. ${title}`}</Text>
            <List marginLeft='20px'>
              {materials.map(({ id, title, type }, subindex) => (
                <ListItem key={`${index}.${subindex}`}>
                  <Flex
                    alignItems='center'
                    justifyContent='space-between'>
                    <Flex>
                      <Text mr={1}>{`${index + 1}.${subindex + 1}. `}</Text>
                      <Button
                        colorScheme='purple'
                        variant='link'
                        whiteSpace='normal'
                        textAlign='left'
                        maxWidth='100%' // Adjust the max-width as needed
                        isDisabled={id === selectedMaterial.id}
                        onClick={() => handleMaterialClick(id)}
                        color={
                          id === selectedMaterial.id ? 'gray' : 'purple.400'
                        }>{`${title}`}</Button>
                    </Flex>

                    <Icon
                      // boxSize={7}
                      color={type === 'TEST' ? 'gray' : 'purple.400'}>
                      <MaterialIcon
                        type={type}
                        size={'24px'}
                      />
                    </Icon>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
