export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews: Review[];
  availabilityStatus:string;
  minimumOrderQuantity:number
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
