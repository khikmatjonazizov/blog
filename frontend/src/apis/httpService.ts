import axios from 'axios'

axios.interceptors.request.use(
    (config) => {
        config.baseURL = process.env.REACT_APP_BASE_URL
        return config
    },
    (error) => {
        throw Error;
    }
)

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    throw error
});


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
}
