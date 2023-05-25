export type GetPostsProps = {
    params?: {
        user_id?: string;
    }
}

export type GetPostsResponse = {
    items: GetPostsResponseItem[];
    count: number;
}

export type GetPostsResponseItem = {
    id: number;
    title: string;
    content: string;
    user_id: number;
    count_likes: number;
}

export type CreatePostProps = {
    body: {
        title: string;
        content: string;
        user_id: number;
    }
}

export type CreatePostResponse = {
    id: number;
    title: string;
    content: string;
    user_id: number;
    count_likes: number;
}

export type LikeAPostResponse = {
    id: number;
    post_id: number;
    user_id: number;
}

export type LikeAPostProps = {
    body: {
        user_id: number;
        post_id: number;
    }
}

export type RemoveLikeProps = LikeAPostProps;
export type RemoveLikeResponse = LikeAPostResponse;
