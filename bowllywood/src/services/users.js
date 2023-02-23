import {AxiosInstance} from '../providers/axiosInstance';

export const register = (values) => {
    return AxiosInstance.post('/users/add', values);
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

// START EDIT filter
export const getAllUsers = (filters=null) => {
    debugger;
    if (filters)
    {
        return AxiosInstance.get(`/users?${filters}`);
    }
// END EDIT filter

    return AxiosInstance.get('/users/');
}

export const getUserDetails = (id) => {
    return AxiosInstance.get('/users/' + id);
    // return AxiosInstance.get(`/users/${id}`);
    // return AxiosInstance.get(`/me`);


}

export const getUserFranchiseRequests = (id) => {
    return AxiosInstance.get(`/users/my-franchise-requests/${id}`);
}