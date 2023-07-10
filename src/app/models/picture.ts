export class PictureStoreResponse{
    id: number;
}

export class PictureIndexResponseItem{
    id: number;
}

export class PictureIndexResponse{
    gallery_name: string;
    pictures: PictureIndexResponseItem[];
    total: number;
}