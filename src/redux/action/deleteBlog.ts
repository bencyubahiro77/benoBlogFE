import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';
import { fetchBlogsAction } from "../../redux/action/blogs"


export const deleteBlogAction = createAsyncThunk('deleteBlog', async (formData: { uuid:string}, { dispatch,rejectWithValue }) =>{
    try{
        const response = await API.delete(`blog/deleteBlog/${formData}`, {
            headers: tokenHeaders()
        });
        dispatch(fetchBlogsAction(1))
        return response.data;
    }catch (error:any) {
        return rejectWithValue(
            error.response?.data?.error || 'An unexpected error occurred.'
        );
    }
})