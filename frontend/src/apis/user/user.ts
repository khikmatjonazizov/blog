import httpService from '../httpService'
import { LoginProps, LoginResponse, SignupResponse } from "./types";

export default {
    login({ body } : LoginProps) {
        return httpService.post<LoginResponse>('/api/user/login', body)
    },
    signup({ body }: LoginProps) {
        return httpService.post<SignupResponse>('/api/user', body)
    },
}
