export interface Item {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "LOST" | "FOUND";
  status: "OPEN" | "CLAIMED" | "RETURNED";
  location: string;
  imageUrl: string | null;
  reportedBy: string;
  lostFoundDate: string;
  createdAt: string;
}

export interface ItemPageResponse {
  content: Item[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}