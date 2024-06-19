import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TDetailedMaterials } from '../../lib/hooks/useMaterialsSlider';
import {
  TMaterial,
  TSection,
} from '../../components/course/content/list/ContentMaterialList';

interface MaterialsState {
  currentMaterials: TDetailedMaterials[];
  selectedMaterial: TMaterial;
  selectedSection: TSection;
}

const initialState: MaterialsState = {
  currentMaterials: [],
  selectedSection: {
    id: '',
    materials: [],
    title: '',
  },
  selectedMaterial: {
    id: '',
    title: '',
    type: 'LECTURE',
  },
};

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    updateMaterials: (state, { payload }: PayloadAction<MaterialsState>) => {
      state.currentMaterials = payload.currentMaterials;
      state.selectedMaterial = payload.selectedMaterial;
      state.selectedSection = payload.selectedSection;
    },
  },
});

export const { updateMaterials } = materialsSlice.actions;

export default materialsSlice.reducer;
