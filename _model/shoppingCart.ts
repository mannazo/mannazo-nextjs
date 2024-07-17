import { Product } from './product'


export interface ShoppingCart {
  items: Array<{ product: Product; quantity: number }>;
}