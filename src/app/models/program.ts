export class ProgramIndexResponseItem{
    id: number;
    name: string;
}

export class ProgramIndexResponse{
    programs: ProgramIndexResponseItem[];
    total: number;
}

export class ProgramStoreRequest{
    name: string;
    description: string;
}

export class ProgramStoreResponse{
    id: number;
}

export class ProgramEditResponse{
    id: number;
    name: string;
    description: string;
}

export class ProgramUpdateRequest{
    name: string;
    description: string;
}