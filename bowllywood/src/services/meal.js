import { AxiosInstance } from "../providers/axiosInstance";

	export const createMeal = (values) => {
		return AxiosInstance.post('/menus/create', values);
	}

	export const updateMeal = (id, values) => {
		return AxiosInstance.post(`/menus/update/${id}`, values);
	}

	export const deleteMeal = (id) => {
		return AxiosInstance.delete(`/menus/delete/${id}`);
	}

	export const getOneMeal = (id) => {
		return AxiosInstance.get(`/menus/${id}`);
	}

	export const getSweetBowls = () => {
		return AxiosInstance.get('/menus/desserts');
	}

	export const getSaltedBowls = () => {
		return AxiosInstance.get('/menus/');
	}

	export const getAllBowls = () => {
		return AxiosInstance.get('/menus/admin-list');
	}

	export const imageUpload = (image) => {
		return AxiosInstance.post('/menus/image-upload', image);
	}