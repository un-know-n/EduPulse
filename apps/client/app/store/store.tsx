import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { coursesApi } from './services/courses';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './reducers/user.slice';

const rootReducer = combineReducers({
  user: userReducer,
  [coursesApi.reducerPath]: coursesApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([coursesApi.middleware]),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
