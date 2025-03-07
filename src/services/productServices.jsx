import apiClient from "../utils/api-client";

export function getSuggestionsAPI(search) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}

export async function addProduct(product, profile) {
  await apiClient.post("/products", product);
}
