import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, endpoint } from '../../constants/api';
import { CategoriesType, ProductsType } from '../../types';
import { Product } from '../../types/products';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesType[], void>({
            query: () => endpoint.categories
        }),
        getListProductsBySearch: builder.query<ProductsType,
            { search: string; limit: number; skip: number; }>({
                query: ({ search, limit, skip }) => {
                    const url = endpoint.search(search, limit, skip);
                    return url
                }
            }),
        getListProductsByCategory: builder.query<ProductsType,
            { name: string; limit: number; skip: number; }>({
                query: ({ name, limit, skip }) => {
                    const url = endpoint.productsByCategory(name, limit, skip);
                    return url
                }
            }),
        getProductDetail: builder.query<Product, { productId: number; }>({
            query: ({ productId }) => endpoint.productsDetail(productId)
        }),
    })
});

export const {
    useGetCategoriesQuery,
    useGetListProductsByCategoryQuery,
    useGetListProductsBySearchQuery,
    useGetProductDetailQuery
} = productsApi;