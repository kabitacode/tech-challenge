export interface ProductsType {
    products?: Product[];
    total?: number;
    skip?: number;
    limit?: number;
}

export interface Product {
    id?: number;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    sku?: string;
    weight?: number;
    dimensions?: Dimensions;
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    reviews?: Review[];
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: Meta;
    images?: string[];
    thumbnail?: string;
}

export interface Dimensions {
    width?: number;
    height?: number;
    depth?: number;
}

export interface Meta {
    createdAt?: Date;
    updatedAt?: Date;
    barcode?: string;
    qrCode?: string;
}

export interface Review {
    rating?: number;
    comment?: string;
    date?: Date;
    reviewerName?: string;
    reviewerEmail?: string;
}
