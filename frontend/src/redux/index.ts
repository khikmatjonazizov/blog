import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import postsSlice from "./slice/postsSlice";


export const store = configureStore({
    reducer: {
        user: userSlice,
        post: postsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
