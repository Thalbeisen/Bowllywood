import { AxiosInstance } from "../providers/axiosInstance";

export const addFranchiseRequest = (values) => {
	return AxiosInstance.post('/franchiseRequests/add', values);
}

export const getFranchiseRequestDetail = (id) => {
    return AxiosInstance.get(`/franchiseRequests/${id}`);
}

export const editFranchiseRequest = (values) => {
	return AxiosInstance.patch('/franchiseRequests/edit/:id', values);
}
