import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    role: "STUDENT" | "ADMIN";
    iat: number;
    exp: number;
}

export const getUserRoleFromToken = (
    token: string
): "STUDENT" | "ADMIN" | null => {

    try {

        const decoded =
            jwtDecode<JwtPayload>(token);

        return decoded.role ?? null;

    } catch (error) {

        console.log(
            "JWT decode error:",
            error
        );

        return null;

    }

};