import { AxiosInstance } from "../providers/axiosInstance";

export const getOneStock = (id) => {
   return AxiosInstance.get(`/stocks/${id}`);
}

export const getAllStocks = () => {
   return AxiosInstance.get('/stocks');
}