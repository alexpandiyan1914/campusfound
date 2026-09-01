import api from "./api";

import {
  UserProfile,
  UpdateProfileRequest,
} from "../types/user";

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

class UserService {

  async getCurrentUser(): Promise<UserProfile> {

    const response = await api.get<UserProfile>(
      "/users/me"
    );

    return response.data;
  }

  async updateProfile(
    data: UpdateProfileRequest
  ): Promise<UserProfile> {

    const response = await api.put<UserProfile>(
      "/users/me",
      data
    );

    return response.data;
  }

  async changePassword(
    request: ChangePasswordRequest
  ): Promise<string> {

    const response =
      await api.put<string>(
        "/users/me/password",
        request
      );

    return response.data;
  }
}

export default new UserService();