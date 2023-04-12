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
    password: string;
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
