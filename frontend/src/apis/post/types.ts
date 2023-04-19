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
    likes: number;
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
}
