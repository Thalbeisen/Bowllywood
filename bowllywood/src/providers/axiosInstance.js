import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: 'https://bowllywood.onrender.com/'
    // baseURL: 'http://localhost:5000/'
    // baseURL: 'http://localhost:3000/'

});

AxiosInstance.interceptors.request.use(function(config) {
    const authHeaders = JSON.parse(localStorage.getItem('userTokens'));
    if (authHeaders)
    {
        config.headers['Authorization'] = 'bearer ' + authHeaders['token'];
    }
    
    return config;
}, function (error) {
    return Promise.reject(error)
});

AxiosInstance.interceptors.response.use(function(response) {
    if (!response.headers.Authorization) {
        const authHeaders = JSON.parse(localStorage.getItem('userTokens'));
        response.headers.Authorization = localStorage.getItem('userTokens')
    }
    return response;
}, function(error) {
    return Promise.reject(error)
});