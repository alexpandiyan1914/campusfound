import api from "./api";

import ENDPOINTS from "../constants/Endpoints";

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

class AuthService {

  async login(
    data: LoginRequest
  ): Promise<LoginResponse> {

    const response = await api.post<LoginResponse>(
      ENDPOINTS.LOGIN,
      data
    );

    return response.data;
  }

  async register(
    data: RegisterRequest
  ): Promise<RegisterResponse> {

    const response = await api.post<RegisterResponse>(
      ENDPOINTS.REGISTER,
      data
    );

    return response.data;
  }
}

export default new AuthService();