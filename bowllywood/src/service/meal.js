import { AxiosInstance } from "../providers/axiosInstance";
	export const createMeal = (id) => {
		return AxiosInstance.post('/menus/create');
	}

	export const updateMeal = (id) => {
		return AxiosInstance.post(`/menus/update${id}`);
	}

	export const deleteMeal = (id) => {
		return AxiosInstance.delete(`/menus/delete/${id}`);
	}

	export const getOneMeal = (id) => {
		return AxiosInstance.get(`/menus/${id}`);
	}
	
	export const getSatlyMeals = () => {
		return AxiosInstance.get('/menus/');
	}








