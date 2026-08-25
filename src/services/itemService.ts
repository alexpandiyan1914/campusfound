import api from "./api";

import {
    Item,
    ItemPageResponse,
    AdminItemRequest,
} from "../types/item";

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

    async searchItems(keyword: string): Promise<Item[]> {

        const response = await api.get<Item[]>(
            `/items/search?keyword=${encodeURIComponent(keyword)}`
        );

        return response.data;

    }

    async getItemsByCategory(
        category: string
    ): Promise<Item[]> {

        const response = await api.get<Item[]>(
            `/items/filter?category=${category}`
        );

        return response.data;

    }

    async createItem(
        request: AdminItemRequest
    ): Promise<Item> {

        const response =
            await api.post<Item>(
                "/items",
                request
            );

        return response.data;
    }


    async updateItem(
        id: number,
        request: AdminItemRequest
    ): Promise<Item> {

        const response =
            await api.put<Item>(
                `/items/${id}`,
                request
            );

        return response.data;
    }


    async deleteItem(
        id: number
    ): Promise<void> {

        await api.delete(
            `/items/${id}`
        );
    }

}

export default new ItemService();