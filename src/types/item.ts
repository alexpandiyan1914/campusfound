export interface Item {
    id: number;
    title: string;
    description: string;
    category: string;
    status: "ACTIVE" | "CLOSED";
    location: string;
    imageUrl: string | null;
    reportedBy: string;
    lostFoundDate: string;
    createdAt: string;
}

export interface ItemPageResponse {
    content: Item[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}