import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { coursesApi } from './services/courses';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './reducers/user.slice';

import materialReducer from './reducers/materials.slice';
import categoriesReducer from './reducers/categories.slice';
import { userApi } from './services/user';

const rootReducer = combineReducers({
  materials: materialReducer,
  user: userReducer,
  categories: categoriesReducer,
  [coursesApi.reducerPath]: coursesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      coursesApi.middleware,
      userApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
