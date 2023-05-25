import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import {
    LoginProps,
    LoginResponse,
    SignupProps,
    SignupResponse,
    UpdateUserProps,
    UpdateUserResponse,
} from '../../apis/user'
import { RootState } from '../index'
import Apis from '../../apis'

const avatars = [
    'https://cspromogame.ru//storage/upload_images/avatars/852.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/879.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/856.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3981.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/897.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/903.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/2038.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3908.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/4169.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3935.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/858.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/865.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/899.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/1299.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/1456.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/1537.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/916.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3969.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/900.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/888.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/4080.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/875.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/833.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3988.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/1289.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/923.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/1152.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/832.jpeg',
    'https://cspromogame.ru//storage/upload_images/avatars/867.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/1319.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3975.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3836.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/2013.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3667.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/4079.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/824.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3915.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3884.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/850.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/3920.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/4085.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/4223.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/838.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/873.jpg',
    'https://cspromogame.ru//storage/upload_images/avatars/1201.jpg',
]

type UserType = {
    loading: boolean;
    error: SerializedError | null,
    isAllowedUser: boolean,
    avatars: string[],
    data: {
        id?: number,
        name?: string,
        surname?: string,
        username?: string,
        avatar_code: number | null,
    }
}

const initialState: UserType = {
    loading: false,
    error: null,
    isAllowedUser: false,
    avatars,
    data: {
        id: undefined,
        name: undefined,
        surname: undefined,
        username: undefined,
        avatar_code: null,
    },
}

export const login = createAsyncThunk<
    LoginResponse,
    LoginProps,
    { state: RootState }
>(
    'login',
    async (args) => {
        const { data } = await Apis.user.login(args)
        return data
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
        return data
    },
)

export const updateUser = createAsyncThunk<
    UpdateUserResponse,
    UpdateUserProps,
    { state: RootState }
>(
    'updateUser',
    async (args) => {
        const { data } = await Apis.user.updateUser(args)
        return data
    },
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserOnState: (state, { payload }: { payload: UserType['data'] }) => {
            state.data = payload
        },
        logOut: (state) => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.error = null
            state.loading = true
            state.isAllowedUser = false
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.error = null
            state.loading = false
            state.data = action.payload
            state.isAllowedUser = true
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
            state.isAllowedUser = false
        })
        builder.addCase(signup.pending, (state) => {
            state.error = null
            state.loading = true
            state.isAllowedUser = false
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.error = null
            state.loading = false
            state.data = action.payload
            state.isAllowedUser = true
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
            state.isAllowedUser = false
        })
        builder.addCase(updateUser.pending, (state) => {
            state.error = null
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.error = null
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    },
})

export const { updateUserOnState, logOut } = userSlice.actions
export default userSlice.reducer
