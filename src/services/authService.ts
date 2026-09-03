import api from "./api";

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    department: string;
    year: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token: string | null;
}

export interface PasswordResetOtpResponse {
    message: string;
    resetToken: string;
}

class AuthService {
    async sendOtp(email: string): Promise<string> {
        const response = await api.post<string>(
            "/auth/send-otp",
            { email }
        );

        return response.data;
    }

    async verifyOtp(
        email: string,
        otp: string
    ): Promise<string> {
        const response = await api.post<string>(
            "/auth/verify-otp",
            {
                email,
                otp,
            }
        );

        return response.data;
    }

    async register(
        request: RegisterRequest
    ): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(
            "/auth/register",
            request
        );

        return response.data;
    }

    async login(
        request: LoginRequest
    ): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>(
            "/auth/login",
            request
        );

        return response.data;
    }

    async sendPasswordResetOtp(
        email: string
    ): Promise<string> {
        const response = await api.post<string>(
            "/auth/forgot-password/send-otp",
            { email }
        );

        return response.data;
    }

    async verifyPasswordResetOtp(
        email: string,
        otp: string
    ): Promise<PasswordResetOtpResponse> {
        const response =
            await api.post<PasswordResetOtpResponse>(
                "/auth/forgot-password/verify-otp",
                {
                    email,
                    otp,
                }
            );

        return response.data;
    }

    async resetPassword(
        resetToken: string,
        newPassword: string
    ): Promise<string> {
        const response = await api.post<string>(
            "/auth/forgot-password/reset",
            {
                resetToken,
                newPassword,
            }
        );

        return response.data;
    }
}

export default new AuthService();