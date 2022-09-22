import { AxiosInstance } from "../providers/axiosInstance";

export const addFranchiseRequest = () => {
	return AxiosInstance.get('/');
}