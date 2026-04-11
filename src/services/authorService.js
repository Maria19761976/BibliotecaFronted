import axios from "axios";
import { apiBaseUrl } from "./apiConfig";

const API_URL = `${apiBaseUrl}/authors`;

export const getAllAuthors = async() => {
    const response = await axios.get(API_URL);
    return response.data;
};
export const getAuthorById = async(id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};
export const createAuthor = async(author) => {
    const response = await axios.post(API_URL, author);
    return response.data;
};
export const updateAuthor = async(id, author) => {
    const response = await axios.put(`${API_URL}/${id}`, author);
    return response.data;
};
export const deleteAuthor = async(id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
