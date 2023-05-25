import httpService from '../httpService'
import {
    GetUsersResponse,
    LoginProps,
    LoginResponse,
    SignupResponse,
    UpdateUserProps,
    UpdateUserResponse,
} from './types'

export default {
    login({ body }: LoginProps) {
        return httpService.post<LoginResponse>('/api/user/login', body)
    },
    signup({ body }: LoginProps) {
        return httpService.post<SignupResponse>('/api/user', body)
    },
    updateUser({ body }: UpdateUserProps) {
        return httpService.put<UpdateUserResponse>('/api/user', body)
    },
    getUsers() {
        return httpService.get<GetUsersResponse>('/api/user')
    }
}
