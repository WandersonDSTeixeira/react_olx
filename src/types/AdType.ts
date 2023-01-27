export type AdType = {
    images: [ string ];
    price: number;
    priceNegotiable: boolean;
    title: string;
    id: string;
    category: {
        name: string;
        slug: string;
    };
    dateCreated: string;
    description: string;
    others: [];
    stateName: { _id: string, name: string };
    userInfo: { name: string, email: string };
    views: number;
}