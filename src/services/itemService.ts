import api from "./api";

import * as ImagePicker
  from "expo-image-picker";

import * as FileSystem
  from "expo-file-system/legacy";

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

    const response =
      await api.get<ItemPageResponse>(
        `/items?page=${page}&size=${size}`
      );

    return response.data;
  }

  async getItemById(
    id: number
  ): Promise<Item> {

    const response =
      await api.get<Item>(
        `/items/${id}`
      );

    return response.data;
  }

  async searchItems(
    keyword: string
  ): Promise<Item[]> {

    const response =
      await api.get<Item[]>(
        `/items/search?keyword=${encodeURIComponent(
          keyword
        )}`
      );

    return response.data;
  }

  async getItemsByCategory(
    category: string
  ): Promise<Item[]> {

    const response =
      await api.get<Item[]>(
        `/items/filter?category=${encodeURIComponent(
          category
        )}`
      );

    return response.data;
  }

  // ADMIN CREATE ITEM

  async createItem(
    request: AdminItemRequest,
    image: ImagePicker.ImagePickerAsset
  ): Promise<Item> {

    const formData = new FormData();

    const jsonFileUri =
      `${FileSystem.cacheDirectory}campusfound-item-${Date.now()}.json`;

    await FileSystem.writeAsStringAsync(
      jsonFileUri,
      JSON.stringify(request),
      {
        encoding:
          FileSystem.EncodingType.UTF8,
      }
    );

    // JSON multipart part
    formData.append(
      "item",
      {
        uri: jsonFileUri,
        name: "item.json",
        type: "application/json",
      } as any
    );

    // Image multipart part
    const fileName =
      image.fileName ||
      `campusfound-${Date.now()}.jpg`;

    const mimeType =
      image.mimeType ||
      "image/jpeg";

    formData.append(
      "image",
      {
        uri: image.uri,
        name: fileName,
        type: mimeType,
      } as any
    );

    try {

      console.log(
        "Uploading item:",
        request
      );

      console.log(
        "Image URI:",
        image.uri
      );

      console.log(
        "Image MIME:",
        mimeType
      );

      const response =
        await api.post<Item>(
          "/items",
          formData,
          {
            timeout: 30000,
          }
        );

      return response.data;

    } finally {

      /*
       * Temporary JSON file is no longer needed.
       */

      try {

        await FileSystem.deleteAsync(
          jsonFileUri,
          {
            idempotent: true,
          }
        );

      } catch {

        // Temporary-file cleanup failure
        // should not break item creation.

      }

    }
  }

  // ADMIN UPDATE ITEM

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

  // ADMIN DELETE ITEM

  async deleteItem(
    id: number
  ): Promise<void> {

    await api.delete(
      `/items/${id}`
    );
  }
}

export default new ItemService();