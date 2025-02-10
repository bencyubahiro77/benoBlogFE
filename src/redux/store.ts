import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./slice/login"
import createUserSlice from "./slice/createUser"
import createBlogSlice from "./slice/createBlog"
import usersSlice from "./slice/users"
import blogsSlice from "./slice/blogs"
import deleteUsersSlice from "./slice/deleteUser"
import deleteBlogSlice from "./slice/deleteBlog"
import updateUserSlice from "./slice/updateUser"
import updateBlogSlice from "./slice/updateBlog"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    createUser: createUserSlice,
    updateUser: updateUserSlice,
    createBlog: createBlogSlice,
    updateBlog: updateBlogSlice,
    users: usersSlice,
    blogs: blogsSlice,
    deleteUser: deleteUsersSlice,
    deleteBlog: deleteBlogSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch