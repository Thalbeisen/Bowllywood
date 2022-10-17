import { AxiosInstance } from "../providers/axiosInstance";

	export const createMeal = (id, values) => {
		return AxiosInstance.post('/menus/create', values);
	}

	export const updateMeal = (id, values) => {
		return AxiosInstance.post(`/menus/update${id}`, values);
	}

	export const deleteMeal = (id) => {
		return AxiosInstance.delete(`/menus/delete/${id}`);
	}

	export const getOneMeal = () => {
		return AxiosInstance.get(`/menus/:id`);
	}

	export const getSweetBowls = () => {
		return AxiosInstance.get('/menus/desserts');
	}

	export const getSaltedBowls = () => {
		return AxiosInstance.get('/menus/');
	}



