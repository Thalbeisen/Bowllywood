import {AxiosInstance} from '../providers/axiosInstance';

export const register = (values) => {
    return AxiosInstance.post('/users/add', values);
}