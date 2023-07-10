export class PracticeStoreRequest{
    activity: string;
    sessions: {
        day: number;
        start: string;
        end: string;
    }[]
}

export class PracticeEditResponse{
    id: number;
    activity: string;
    sessions: {
        day: number;
        start: string;
        end: string;
    }[]
}

export class PracticeUpdateRequest{
    activity: string;
    sessions: {
        day: number;
        start: string;
        end: string;
    }[]
}