import api from "./api";

import {
    Claim,
    ClaimPageResponse,
    CreateClaimRequest,
} from "../types/claim";

class ClaimService {

    // STUDENT
    async createClaim(
        request: CreateClaimRequest
    ): Promise<Claim> {

        const response =
            await api.post<Claim>(
                "/claims",
                request
            );

        return response.data;
    }

    async getMyClaims(
        page = 0,
        size = 10
    ): Promise<ClaimPageResponse> {

        const response =
            await api.get<ClaimPageResponse>(
                `/claims/my?page=${page}&size=${size}&sort=createdAt`
            );

        return response.data;
    }

    async getClaimById(
        id: number
    ): Promise<Claim> {

        const response =
            await api.get<Claim>(
                `/claims/${id}`
            );

        return response.data;
    }

    // ADMIN

    async getAllClaims(
        page = 0,
        size = 10
    ): Promise<ClaimPageResponse> {

        const response =
            await api.get<ClaimPageResponse>(
                `/claims?page=${page}&size=${size}&sort=createdAt`
            );

        return response.data;
    }


    async getPendingClaims(
        page = 0,
        size = 10
    ): Promise<ClaimPageResponse> {

        const response =
            await api.get<ClaimPageResponse>(
                `/claims/pending?page=${page}&size=${size}&sort=createdAt`
            );

        return response.data;
    }


    async approveClaim(
        id: number
    ): Promise<Claim> {

        const response =
            await api.put<Claim>(
                `/claims/${id}/approve`
            );

        return response.data;
    }


    async rejectClaim(
        id: number
    ): Promise<Claim> {

        const response =
            await api.put<Claim>(
                `/claims/${id}/reject`
            );

        return response.data;
    }
}

export default new ClaimService();