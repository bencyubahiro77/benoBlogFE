import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchBlogsAction } from "../action/blogs"
import { blogsState } from '../../types/types'

const initialState: blogsState = {
    blogsByPage:[],
    currentPage: 1,
    totalPages: 1,
    totalComment:0,
    status: 'idle',
    error: null,
}

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setCurrentPage: (state, action:PayloadAction<number>) =>{
            state.currentPage = action.payload 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogsAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogsAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogsByPage[action.payload.page] = action.payload.data;
                state.totalPages = Math.ceil(action.payload.total / 10); 
            })
            .addCase(fetchBlogsAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
})
export const {setCurrentPage} = blogsSlice.actions
export default blogsSlice.reducer