import { Product } from './Product.model';

export interface Category {
  name: string;
  products?: Product[];
}
