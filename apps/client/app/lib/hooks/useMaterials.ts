import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import useMaterialsSlider from './useMaterialsSlider';
import useSyncQueryParams from './useSyncQueryParams';
import { TSection } from '../../components/course/content/list/ContentMaterialList';

type TProps = {
  sections: TSection[];
};

export const useMaterials = ({ sections }: TProps) => {
  const searchParamsURL = useSearchParams();
  const { queryParams, handleChange } = useSyncQueryParams({
    sectionId: searchParamsURL.get('sectionId') ?? sections[0].id,
    materialId:
      searchParamsURL.get('materialId') ?? sections[0].materials[0].id,
  });

  const { next, prev, setMaterialIndex, materials } = useMaterialsSlider(
    sections,
    queryParams.materialId,
  );

  // useEffect(() => {
  //   console.log('PATH NAME: ', pathname);
  // }, []);

  // useEffect(() => {
  //   handleChange('materialId', selectedMaterial.id);
  //   handleChange('sectionId', selectedSection.id);
  // }, [selectedMaterial.id, selectedSection.id]);

  return {
    next,
    prev,
    setMaterialIndex,
    materials,
    queryParams,
    handleChange,
  };
};
