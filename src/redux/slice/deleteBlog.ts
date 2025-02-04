import { createSlice } from '@reduxjs/toolkit'
import { deleteBlogAction } from '../action/deleteBlog'

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const deleteBlogSlice = createSlice({
    name: 'deleteBlog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteBlogAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBlogAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteBlogAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
    },
})
export default deleteBlogSlice.reducer