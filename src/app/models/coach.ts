export class CoachStoreRequest{
    name: string;
    email: string;
    phone: string;
}

export class CoachStoreResponse{
    id: number;
}

export class CoachIndexResponseItem{
    id: number;
    name: string;
    email: string;
    phone: string;
}

export class CoachUpdateRequest{
    name: string;
    email: string;
    phone: string;
}