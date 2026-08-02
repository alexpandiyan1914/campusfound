import api from "./api";
import { ItemPageResponse } from "../types/item";

const itemService = {
  getItems: async (page = 0, size = 10): Promise<ItemPageResponse> => {
    const response = await api.get(`/items?page=${page}&size=${size}`);
    return response.data;
  },
};

export default itemService;