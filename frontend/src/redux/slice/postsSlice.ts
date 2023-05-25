import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../index";
import Apis from '../../apis'
import {
    CreatePostProps,
    CreatePostResponse,
    GetPostsProps,
    GetPostsResponse,
    GetPostsResponseItem, LikeAPostProps, LikeAPostResponse, RemoveLikeProps, RemoveLikeResponse,
} from '../../apis/post'

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

export const likeAPost = createAsyncThunk<
    LikeAPostResponse,
    LikeAPostProps,
    { state: RootState }
>(
    'likeAPost',
    async (args) => {
        const { data } = await Apis.post.likeAPost(args)
        return data;
    },
)

export const removeLike = createAsyncThunk<
    RemoveLikeResponse,
    RemoveLikeProps,
    { state: RootState }
>(
    'removeLike',
    async (args) => {
        const { data } = await Apis.post.removeLike(args)
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
            state.items = [action.payload,...state.items]
        })
        builder.addCase(createPost.rejected, (state, action) => {
            state.loading = false
            state.error = action.error
        })
        builder.addCase(likeAPost.pending, (state) => {
            state.error = null
        })
        builder.addCase(likeAPost.fulfilled, (state, action) => {
            state.error = null;
            state.items = state.items.map(post => {
                if(post.id === action.payload.post_id) return {...post, count_likes: post.count_likes + 1}

                return {...post}
            })
        })
        builder.addCase(likeAPost.rejected, (state, action) => {
            state.error = action.error
        })
        builder.addCase(removeLike.pending, (state) => {
            state.error = null
        })
        builder.addCase(removeLike.fulfilled, (state, action) => {
            state.error = null;
            state.items = state.items.map(post => {
                if(post.id === action.payload.post_id) return {...post, count_likes: post.count_likes - 1}

                return {...post}
            })
        })
        builder.addCase(removeLike.rejected, (state, action) => {
            state.error = action.error
        })
    }
})

export default userSlice.reducer
