import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';


export const createBlogAction = createAsyncThunk(
    'createBlog',
    async (formData: { title: string; category: string; coverImage: File | null; description: string }, { rejectWithValue }) => {
      try {
        const data = new FormData(); 
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('description', formData.description);
  
        if (formData.coverImage) {
          data.append('coverImage', formData.coverImage);
        }
  
        const response = await API.post('blog/createBlog', data, {
          headers: {
            ...tokenHeaders(), 
            'Content-Type': 'multipart/form-data', // Ensure the Content-Type is multipart/form-data
          },
        });
  
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.error || 'An unexpected error occurred.'
        );
      }
    }
);
  