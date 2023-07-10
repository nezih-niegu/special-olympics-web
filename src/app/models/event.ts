export class EventResponseIndexItem{
    id: number;
    name: string;
    start: Date;
    end: Date;
}

export class EventStoreRequest{
    name: string;
    description: string;
    start: Date;
    end: Date;
    location: string;
    contact_email: string;
    type: number;
}

export class EventEditResponse{
    id: number
    name: string;
    description: string;
    start: Date;
    end: Date;
    location: string;
    contact_email: string;
    type: number;
    athletes: number;
    volunteers: number;
    gallery_id: number;
}

export class EventUpdateRequest{
    name: string;
    description: string;
    start: Date;
    end: Date;
    location: string;
    contact_email: string;
    type: number;
    athletes: number;
    volunteers: number;
}