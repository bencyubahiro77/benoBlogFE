import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';


export const fetchBlogsAction = createAsyncThunk('fetchBlog', async (page:number, { rejectWithValue }) =>{
    try{
        const response = await API.get(`/blog/getAllBlog?page=${page}`,
            {headers: tokenHeaders()
        });
        return response.data;
    }catch (error:any) {
        return rejectWithValue(
            error.response?.data?.error || 'An unexpected error occurred.'
        );
    }
})