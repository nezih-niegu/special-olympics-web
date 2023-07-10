export class StateStoreRequest{
    name: string;
    admin_name: string;
    email: string;
}

export class StateStoreResponse{
    id: number;
}

export class StateUpdateRequest{
    name: string;
    admin_name: string;
    email: string;
}

export class StateAdminsIndexResponseItem{
    id: number;
    name: string;
    admin_name: string;
    email: string;
}

export class StateAdminsIndexResponse{
    states: StateAdminsIndexResponseItem[]
    total: number;
}

export class StateContactUpdateRequest{
    email: string;
    facebook: string;
    instagram: string;
}

export class StateContactShowResponse{
    email: string;
    facebook: string;
    instagram: string;
}