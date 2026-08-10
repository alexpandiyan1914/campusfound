import api from "./api";

import {
    Claim,
    ClaimPageResponse,
    CreateClaimRequest,
} from "../types/claim";

class ClaimService {

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

}

export default new ClaimService();