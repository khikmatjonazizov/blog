import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { LoginProps, LoginResponse, SignupProps, SignupResponse } from "../../apis/user";
import { RootState } from "../index";
import Apis from '../../apis'

type UserType = {
    loading: boolean;
    error: SerializedError | null,
    data: {
        id?: number,
        name?: string,
        surname?: string,
        username?: string,
        password?: string,
    }
}

const initialState: UserType = {
    loading: false,
    error: null,
    data: {
        id: undefined,
        name: undefined,
        surname: undefined,
        username: undefined,
        password: undefined,
    }
}

export const login = createAsyncThunk<
    LoginResponse,
    LoginProps,
    { state: RootState }
>(
    'login',
    async (args) => {
        const { data } = await Apis.user.login(args)
        return data;
    },
)

export const signup = createAsyncThunk<
    SignupResponse,
    SignupProps,
    { state: RootState }
>(
    'signup',
    async (args) => {
        const { data } = await Apis.user.signup(args)
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
            state.data = action.payload
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    }
})

export default userSlice.reducer
