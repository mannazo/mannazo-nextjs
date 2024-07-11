import { Product } from '../_model/product'


export interface ShoppingCart {
  items: Array<{ product: Product; quantity: number }>;
}