import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./slice/login"
import createUserSlice from "./slice/createUser"
import createBlogSlice from "./slice/createBlog"
import usersSlice from "./slice/users"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    createUser: createUserSlice,
    createBlog: createBlogSlice,
    users: usersSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch