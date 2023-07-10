export class ActivityIndexResponseItem{
    id: number;
    name: string;
}

export class ActivityIndexResponse{
    activities: ActivityIndexResponseItem[];
    total: number;
}

export class ActivityStoreRequest{
    name: string;
    description: string;
}

export class ActivityStoreResponse{
    id: number;
}

export class ActivityShowResponse{
    name: string;
    description: string;
}

export class ActivityEditResponse{
    id: number;
    name: string;
    description: string;
}

export class ActivityUpdateRequest{
    name: string;
    description: string;
}