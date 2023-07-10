export class SportStoreRequest{
    name: string;
    description: string;
    notes: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    locations: string[];
}

export class SportStoreResponse{
    id: number;
}

export class SportIndexResponseItem{
    id: number;
    name: string;
}

export class SportIndexResponse{
    sports: SportIndexResponseItem[];
    total: number;
}

export class SportShowResponse{
    id: number;
    name: string;
    description: string;
    notes: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    locations: {
        id: number;
        name: string;
    }[];
    gallery_id: number;
}

export class SportUpdateRequest{
    name: string;
    description: string;
    notes: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    locations: string[];
}

export class SportUpdateResponse{
    locations: {
        id: number;
        name: string;
    }[]
}