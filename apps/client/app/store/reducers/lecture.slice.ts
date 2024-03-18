import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LectureState {
  lectureName: string;
  lectureContent: string;
}

const initialState: LectureState = {
  lectureName: '',
  lectureContent: '',
};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {
    updateLectureName: (state, action: PayloadAction<string>) => {
      state.lectureName = action.payload;
    },
    updateLectureContent: (state, action: PayloadAction<string>) => {
      state.lectureContent = action.payload;
    },
    resetLectureForm: (state) => {
      state.lectureName = '';
      state.lectureContent = '';
    },
  },
});

export const { updateLectureName, updateLectureContent, resetLectureForm } =
  lectureSlice.actions;

export default lectureSlice.reducer;
