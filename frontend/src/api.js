import axios from "axios";

const API_BASE = "/api";

export const fetchPizzas = () => axios.get(`${API_BASE}/pizza/all`);
export const fetchExtras = () => axios.get(`${API_BASE}/extra/all`);
