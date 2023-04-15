import { AxiosInstance } from "../providers/axiosInstance";
// import {axiosInstance} from '../providers/axiosInstance';

export const createReservation = (values) => {
    return AxiosInstance.post('/reservations/create', values);
}

export const getAllReservations = (day) => {
    return AxiosInstance.get(`/reservations/admin-list/${day}`);
}

export const getUserReservations = () => {
    return AxiosInstance.get('/reservations/');
}

export const editReservation = (id, values) => {
    return AxiosInstance.patch(`/reservations/update/${id}`, values);
}

export const cancelReservation = (id) => {
    return AxiosInstance.patch(`/reservations/cancel/${id}`);
}

export const getReservationByDay = (day, status) => {
    return AxiosInstance.get(`/reservations/day-seats/${day}/${status}`)
}

export const getOneReservation = (id) => {
    return AxiosInstance.get(`/reservations/${id}`);
}