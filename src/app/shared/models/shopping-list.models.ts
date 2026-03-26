export interface AddToShoppingListRequest {
  productId: number;
  quantity: number;
}

export interface ShoppingListItem {
  productId: number;
  productName: string;
  quantity: number;
  weight: number;
}
