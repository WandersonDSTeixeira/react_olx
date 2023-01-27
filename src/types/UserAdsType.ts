export type UserAdsType = {
    _doc: {
        category: string;
        categoryName: string;
        dateCreated: string;
        description: string;
        idUser: string;
        images: [{
            url: string;
            default: boolean;
        }];
        image: { url: string };
        price: string;
        priceNegotiable: boolean;
        state: string;
        status: boolean;
        title: string;
        views: number;
        _id: string;
    };
    image: { url: string };
}