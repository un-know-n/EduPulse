import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  TMaterial,
  TSection,
} from '../../components/course/content/list/ContentMaterialList';
import { usePathname, useRouter } from 'next/navigation';
import { useTypedDispatch } from './redux';
import { updateMaterials } from '../../store/reducers/materials.slice';

export type TDetailedMaterials = {
  material: TMaterial;
  section: TSection;
  materialIndex: number;
};

const useMaterialsSlider = (
  sections: TSection[],
  initialMaterialId: string | null = null,
) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useTypedDispatch();

  // Flatten the materials array and keep track of section origins
  const materials = useMemo((): TDetailedMaterials[] => {
    const result: TDetailedMaterials[] = [];
    sections.forEach((section) => {
      section.materials.forEach((material) => {
        result.push({ material, section, materialIndex: 0 });
      });
    });
    return result.map((item, index) => ({ ...item, materialIndex: index }));
  }, [sections]);

  const initialIndex = initialMaterialId
    ? materials.findIndex((item) => item.material.id === initialMaterialId)
    : 0;
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex !== -1 ? initialIndex : 0,
  );

  const maxVisible = 3;
  const middleIndex = Math.floor(maxVisible / 2);

  const currentMaterials = useMemo((): typeof materials => {
    if (materials.length <= maxVisible) {
      return materials;
    }

    let start = currentIndex - middleIndex;
    let end = currentIndex + middleIndex + 1;

    if (start < 0) {
      start = 0;
      end = maxVisible;
    } else if (end > materials.length) {
      end = materials.length;
      start = materials.length - maxVisible;
    }

    return materials.slice(start, end);
  }, [currentIndex, materials]);

  const findMaterialByIndex = (index: number) =>
    materials.find((material) => material.materialIndex === index)!;
  const generateQueryParams = ({ material, section }: (typeof materials)[0]) =>
    `?sectionId=${section.id}&materialId=${material.id}`;
  // const generateMaterialLink = (material: (typeof materials)[0]) =>
  //   `${pathname}${generateQueryParams(material)}`;

  const next = useCallback(() => {
    if (currentIndex < materials.length - 1) {
      setCurrentIndex(currentIndex + 1);
      router.push(
        `${pathname}${generateQueryParams(
          findMaterialByIndex(currentIndex + 1),
        )}`,
      );
    }
  }, [currentIndex, materials.length]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      router.push(
        `${pathname}${generateQueryParams(
          findMaterialByIndex(currentIndex - 1),
        )}`,
      );
    }
  }, [currentIndex]);

  const setMaterialIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < materials.length) {
        setCurrentIndex(index);
        router.push(
          `${pathname}${generateQueryParams(findMaterialByIndex(index))}`,
        );
      }
    },
    [materials.length],
  );

  // Effect to update currentIndex if initialMaterialId changes
  useEffect(() => {
    if (initialMaterialId) {
      const index = materials.findIndex(
        (item) => item.material.id === initialMaterialId,
      );
      if (index !== -1) {
        setCurrentIndex(index);
        router.push(
          `${pathname}${generateQueryParams(findMaterialByIndex(index))}`,
        );
      }
    }
  }, [initialMaterialId, materials]);

  useEffect(() => {
    dispatch(
      updateMaterials({
        currentMaterials,
        selectedMaterial: materials[currentIndex]?.material || null,
        selectedSection: materials[currentIndex]?.section || null,
      }),
    );
  }, [currentMaterials, currentIndex, materials]);

  return {
    // currentMaterials,
    // selectedMaterial: materials[currentIndex]?.material || null,
    // selectedSection: materials[currentIndex]?.section || null,
    next,
    prev,
    setMaterialIndex,
    materials,
  };
};

export default useMaterialsSlider;
