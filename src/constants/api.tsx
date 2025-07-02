export const API_BASE_URL = 'https://dummyjson.com';

export const endpoint = {
    categories: `${API_BASE_URL}/products/categories`,
    search: (search: string, limit: number, skip: number) => `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`,
    productsByCategory: (name: string, limit: number, skip: number) => `${API_BASE_URL}/products/category/${name}?limit=${limit}&skip=${skip}`,
    productsDetail: (productId: number) => `${API_BASE_URL}/products/${productId}`,
}