import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});

AxiosInstance.interceptors.request.use(function(config) {
    const authHeaders = JSON.parse(localStorage.getItem('userTokens'));
<<<<<<< HEAD

=======
>>>>>>> dev
    if (authHeaders)
    {
        config.headers['Authorization'] = 'bearer ' + authHeaders['token'];
    }
<<<<<<< HEAD
    
=======
>>>>>>> dev
    return config;
}, function (error) {
    return Promise.reject(error)
});

AxiosInstance.interceptors.response.use(function(response) {
    if (!response.headers.Authorization) {
        const authHeaders = JSON.parse(localStorage.getItem('userTokens'));
        response.headers.Authorization = localStorage.getItem('userTokens')
        console.log(authHeaders)
    }
    return response;
}, function(error) {
    return Promise.reject(error)
});