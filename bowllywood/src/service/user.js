import { AxiosInstance } from "../providers/axiosInstance";

export const getAllUsers = () => {
    return AxiosInstance.get('/users/');
}

export const getUserDetails = (id) => {
    return AxiosInstance.get('/users/' + id);
}

export const createUser = () => {
    return AxiosInstance.post('/users/add/')
}

export const editUser = (id) => {
    return AxiosInstance.patch('/users/' + id);
}

export const deleteUser = (id) => {
    return AxiosInstance.delete('/users/' + id);
}

export const loginUser = (values) => {
    return AxiosInstance.post('/users/login/', values);
}