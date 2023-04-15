import { AxiosInstance } from "../providers/axiosInstance";

export const getAllRestaurants = () => {
	return AxiosInstance.get('/restaurants');
}

export const getRestaurantDetail = (id) => {
  return AxiosInstance.get(`/restaurants/${id}`);
}