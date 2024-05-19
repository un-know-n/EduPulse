import { UserType } from '../../config/@types/next-auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = UserType & { token: string };

const initialState: UserState = {
  role: '',
  id: '',
  name: '',
  description: '',
  createdAt: '' as unknown as Date,
  email: '',
  image: '',
  emailVerified: null,
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserState>) => {
      state.role = payload.role;
      state.id = payload.id;
      state.email = payload.email;
      state.image = payload.image;
      state.name = payload.name;
      state.description = payload.description;
      state.createdAt = payload.createdAt;
      state.emailVerified = payload.emailVerified;
      state.token = payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
