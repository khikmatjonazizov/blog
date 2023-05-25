import httpService from '../httpService'
import {
    CreatePostProps,
    CreatePostResponse,
    GetPostsProps,
    GetPostsResponse,
    LikeAPostProps, LikeAPostResponse,
    RemoveLikeProps, RemoveLikeResponse,
} from './types'

export default {
    getPosts({ params } : GetPostsProps) {
        return httpService.get<GetPostsResponse>('/api/post', { params })
    },
    createPost({ body }: CreatePostProps) {
        return httpService.post<CreatePostResponse>('/api/post', body)
    },
    likeAPost: ({ body }: LikeAPostProps) => {
        return httpService.post<LikeAPostResponse>('api/post/like')
    },
    removeLike: ({ body }: RemoveLikeProps) => {
        return httpService.delete<RemoveLikeResponse>('api/post/like')
    }
}
