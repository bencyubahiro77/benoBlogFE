import { createSlice } from '@reduxjs/toolkit'
import { createBlogAction } from "../action/createBlog"

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const createBlogSlice = createSlice({
    name: 'createBlog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBlogAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBlogAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(createBlogAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
})

export default createBlogSlice.reducer