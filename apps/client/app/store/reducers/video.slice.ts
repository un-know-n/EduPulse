import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  videoName: string;
  videoURL: string;
  videoContent: string;
}

const initialState: VideoState = {
  videoName: '',
  videoURL: '',
  videoContent: '',
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    updateVideoName: (state, action: PayloadAction<string>) => {
      state.videoName = action.payload;
    },
    updateVideoURL: (state, action: PayloadAction<string>) => {
      state.videoURL = action.payload;
    },
    updateVideoContent: (state, action: PayloadAction<string>) => {
      state.videoContent = action.payload;
    },
    resetVideoForm: (state) => {
      state.videoName = '';
      state.videoURL = '';
      state.videoContent = '';
    },
  },
});

export const {
  updateVideoName,
  updateVideoURL,
  updateVideoContent,
  resetVideoForm,
} = videoSlice.actions;

export default videoSlice.reducer;
