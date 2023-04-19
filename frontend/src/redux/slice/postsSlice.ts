import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { LoginProps, LoginResponse, SignupProps, SignupResponse } from "../../apis/user";
import { RootState } from "../index";
import Apis from '../../apis'
import { GetPostsResponseItem } from "../../apis/post";

type PostsType = {
    loading: boolean;
    error: SerializedError | null,
    items: GetPostsResponseItem[];
    count: number;
}

const initialState: PostsType = {
    loading: false,
    error: null,
    items: [],
    count: 0,
}

export const login = createAsyncThunk<
    LoginResponse,
    LoginProps,
    { state: RootState }
>(
    'login',
    async (payload, thunkAPI) => {
        const { data } = await Apis.user.login(payload)
        return data;
    },
)

export const signup = createAsyncThunk<
    SignupResponse,
    SignupProps,
    { state: RootState }
>(
    'signup',
    async (payload, thunkAPI) => {
        const { data } = await Apis.user.signup(payload)
        return data;
    },
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.error = null
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.error = null;
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
        builder.addCase(signup.pending, (state) => {
            state.error = null
            state.loading = true
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.error = null;
            state.loading = false;
            state.items = action.payload
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    }
})

export default userSlice.reducer
