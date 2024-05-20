import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCategoriesResponse } from '../../components/course/@types/course';
type TCategoriesState = {
  categories: TCategoriesResponse[];
};

const initialState: TCategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCategories: (
      state,
      { payload }: PayloadAction<TCategoriesResponse[]>,
    ) => {
      state.categories = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
