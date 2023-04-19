import httpService from '../httpService'
import { CreatePostProps, CreatePostResponse, GetPostsProps, GetPostsResponse } from "./types";

export default {
    getPosts({ params } : GetPostsProps) {
        return httpService.get<GetPostsResponse>('/api/post', { params })
    },
    createPost({ body }: CreatePostProps) {
        return httpService.post<CreatePostResponse>('/api/user', body)
    },
}
