import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./slice/login"
import createUserSlice from "./slice/createUser"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    createUser: createUserSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch