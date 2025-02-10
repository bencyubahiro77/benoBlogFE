import { createSlice } from '@reduxjs/toolkit'
import { updateBlogAction } from "../action/updateBlog"

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const createBlogSlice = createSlice({
    name: 'updateBlog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateBlogAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBlogAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateBlogAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
})

export default createBlogSlice.reducer