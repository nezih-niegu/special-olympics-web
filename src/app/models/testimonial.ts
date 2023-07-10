export class TestimonialIndexResponseItem{
    id: number;
    title: string;
}

export class TestimonialIndexResponse{
    testimonials: TestimonialIndexResponseItem[];
    total: number;
}

export class TestimonialStoreRequest{
    title: string;
    content: string;
    type: number;
}

export class TestimonialStoreResponse{
    id: number;
}

export class TestimonialEditResponse{
    id: number;
    title: string;
    content: string;
    type: number;
}

export class TestimonialUpdateRequest{
    title: string;
    content: string;
    type: number;
}