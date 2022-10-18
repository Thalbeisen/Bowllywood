import { AxiosInstance } from "../providers/axiosInstance";

export const addFranchiseRequest = (values) => {
	return AxiosInstance.post('/franchiseRequests/add', values);
}