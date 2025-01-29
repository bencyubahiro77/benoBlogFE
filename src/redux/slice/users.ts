import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { fetchUsersAction } from "../action/users"
import { UsersState } from '../../types/types'

const initialState: UsersState = {
    usersByPage:[],
    currentPage: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentPage: (state, action:PayloadAction<number>) =>{
            state.currentPage = action.payload 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsersAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.usersByPage[action.payload.page] = action.payload.data;
                state.totalPages = Math.ceil(action.payload.total / 10); 
            })
            .addCase(fetchUsersAction.rejected, (state) => {
                state.status = 'failed';
            });
    },
})
export const {setCurrentPage} = usersSlice.actions
export default usersSlice.reducer