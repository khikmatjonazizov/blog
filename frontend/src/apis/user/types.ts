

export type LoginProps = {
    body: {
        username: string;
        password: string;
    }
}

export type LoginResponse = {
    id: number;
    name: string;
    surname: string;
    username: string;
    avatar_code: number | null;
}

export type SignupProps = {
    body: {
        name: string;
        surname: string;
        username: string;
        password: string;
    }
}

export type SignupResponse = LoginResponse;

export type UpdateUserProps = {
    body: {
        id: number;
        name: string;
        surname: string;
        avatar_code: number | null;
    }
}

export type UpdateUserResponse = {
    id: number;
    name: string;
    surname: string;
    username: string;
    avatar_code: number;
}

export type GetUsersResponse = {
    count: number;
    items: GetUsersResponseItem[];
}

export type GetUsersResponseItem = {
    id: number;
    name: string;
    surname: string;
    username: string;
    avatar_code: null | number;
}
