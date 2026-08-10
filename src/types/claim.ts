export type ClaimStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

export interface Claim {

    id: number;

    itemId: number;

    itemTitle: string;

    claimedById: number;

    claimedBy: string;

    claimantEmail: string;

    reason: string;

    status: ClaimStatus;

    createdAt: string;

    updatedAt: string;

}

export interface CreateClaimRequest {

    itemId: number;

    reason: string;

}

export interface ClaimPageResponse {

    content: Claim[];

    totalPages: number;

    totalElements: number;

    number: number;

    size: number;

    first: boolean;

    last: boolean;

}