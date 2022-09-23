import { AxiosInstance } from "../providers/axiosInstance";

export const createUser = () => {
    return AxiosInstance.post('/users/add/')
}

