import api from "./api";

import { Item, ItemPageResponse } from "../types/item";

class ItemService {

    async getItems(
        page = 0,
        size = 10
    ): Promise<ItemPageResponse> {

        const response = await api.get<ItemPageResponse>(
            `/items?page=${page}&size=${size}`
        );

        return response.data;

    }

    async getItemById(
        id: number
    ): Promise<Item> {

        const response = await api.get<Item>(
            `/items/${id}`
        );

        return response.data;

    }

}

export default new ItemService();