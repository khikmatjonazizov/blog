import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { LoginProps, LoginResponse, SignupProps, SignupResponse } from "../../apis/user";
import { RootState } from "../index";
import Apis from '../../apis'
import {
    CreatePostProps,
    CreatePostResponse,
    GetPostsProps,
    GetPostsResponse,
    GetPostsResponseItem
} from "../../apis/post";

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

export const getPosts = createAsyncThunk<
    GetPostsResponse,
    GetPostsProps,
    { state: RootState }
>(
    'getPosts',
    async (args) => {
        const { data } = await Apis.post.getPosts(args)
        return data;
    }
)

export const createPost = createAsyncThunk<
    CreatePostResponse,
    CreatePostProps,
    { state: RootState }
>(
    'createPost',
    async (args) => {
        const { data } = await Apis.post.createPost(args)
        return data;
    },
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.error = null
            state.loading = true
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.error = null;
            state.loading = false;
            state.items = action.payload.items
            state.count = action.payload.count
        })
        builder.addCase(getPosts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
        builder.addCase(createPost.pending, (state) => {
            state.error = null
            state.loading = true
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.error = null;
            state.loading = false;
            state.items = [{...action.payload, likes: 0},...state.items]
        })
        builder.addCase(createPost.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
    }
})

export default userSlice.reducer
