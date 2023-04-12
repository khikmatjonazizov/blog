import httpService from '../httpService'
import { LoginProps, LoginResponse, SignupResponse } from "./types";

export default {
    login({ body } : LoginProps) {
        return httpService.post<LoginResponse>('/api/user/login', body)
    },
    signup({ body }: LoginProps) {
        return httpService.post<SignupResponse>('/api/user', body)
    },
    // getCountries({ params }: GetCountries) {
    //     return httpService.get<GetCountriesResponse>('/v1/area/countries', { params })
    // },
    // getStates({ params }: GetStates) {
    //     return httpService.get<GetStatesResponse>('/v1/area/states', { params })
    // },
    // getCities({ params }: GetCities) {
    //     return httpService.get<GetCitiesResponse>('/v1/area/cities', { params })
    // },
    // getDistricts({ params }: GetDistricts) {
    //     return httpService.get<GetDistrictsResponse>('/v1/area/districts', { params })
    // },
}
