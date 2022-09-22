import { AxiosInstance } from "../providers/axiosInstance";

export const getOneMeal = (id) => {
	return AxiosInstance.get('/menus/' + id);
}