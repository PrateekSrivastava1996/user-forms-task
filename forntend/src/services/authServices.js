import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

export const registerUser = (user) => {
  return axios.post(`${apiBaseUrl}/auth/signup`, { ...user });
};

export const loginUser = async (user) => {
  return await axios.post(`${apiBaseUrl}/auth/login`, { ...user });
};

