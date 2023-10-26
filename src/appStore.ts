import { configureStore } from '@reduxjs/toolkit'
import formReducer from './JobApplicationForm/formReducer'

export const store = configureStore({
  reducer: {
    form: formReducer
  },
});

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;