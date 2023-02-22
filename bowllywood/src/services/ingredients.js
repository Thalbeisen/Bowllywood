import { AxiosInstance } from "../providers/axiosInstance";

export const getOneIngredient = (id) => {
    return AxiosInstance.get(`/ingredients/${id}`);
}

export const getAllIngredients = (cat) => {
    return AxiosInstance.get(`/ingredients/list/${cat}`);
}