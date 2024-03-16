import axios from "axios";

export const api = axios.create({
  baseURL: 'https://felipe-backend-food.onrender.com'
});