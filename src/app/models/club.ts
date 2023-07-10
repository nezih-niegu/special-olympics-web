export class ClubIndexResponseItem{
    id: number;
    name: string;
}

export class ClubIndexResponse{
    clubs: ClubIndexResponseItem[];
    total: number;
}

export class ClubStoreRequest{
    name: string;
    contact_name: string;
    contact_email: string;
    available_sports: {
        name: string,
        address: string
    }[]
}

export class ClubEditResponse{
    id: number;
    name: string;
    contact_name: string;
    contact_email: string;
    available_sports: {
        name: string,
        address: string
    }[]
    gallery_id: number;
}

export class ClubUpdateRequest{
    name: string;
    contact_name: string;
    contact_email: string;
    available_sports: {
        name: string,
        address: string
    }[]
}