import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchUser, fetchUsers, postUser, patchUser, deleteUser, planUser} from './usersAPI';

const initialState = {
    value: {users:[], count: 0, page: 1, sort: 'id', order: 'asc'},
    status: 'idle',
    user: {},
    plan:[],
    message:''
};


export const fetchUsersAsync = createAsyncThunk(
    'users/fetchUsers',
    async (data) => {
        const response = await fetchUsers(data);
        return response.data;
    }
);

export const fetchUserAsync = createAsyncThunk(
    'users/fetchUser',
    async (id) => {
        const response = await fetchUser(id);
        return response.data;
    }
);

export const postUserAsync = createAsyncThunk(
    'users/postUser',
    async (data) => {
        const response = await postUser(data);
        return response.data;
    }
);

export const patchUserAsync = createAsyncThunk(
    'users/patchUser',
    async (data) => {
        const response = await patchUser(data);
        return response.data;
    }
);

export const deleteUserAsync = createAsyncThunk(
    'users/deleteUser',
    async (id) => {
        const response = await deleteUser(id);
        return response.data;
    }
);

export const planUserAsync = createAsyncThunk(
    'users/planUser',
    async(id) => {
        const response = await planUser(id);
        return response.data
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(fetchUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload;
            })
            .addCase(postUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload;
            })
            .addCase(patchUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(patchUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload;
            })
            .addCase(deleteUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.message = action.payload;
            })
            .addCase(planUserAsync.pending, (state) =>{
                state.status = 'loading'
            } )
            .addCase(planUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.plan = action.payload;
            })

    },
});


export const selectUsers = (state) => state.users.value;
export const selectUser = (state) => state.users.user;
export const loadingStatus = (state) => state.users.status;
export const selectPlan = (state) => state.users.plan
export const stateMessage = (state) => state.users.message;

export default usersSlice.reducer;
