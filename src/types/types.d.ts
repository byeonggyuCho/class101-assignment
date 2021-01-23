export interface RouteType {
  route: string;
  text: string;
}

export type RoutesType = RouteType[];

export interface ProductItemType {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
  isAddedToCart?: boolean;
  amount?: number;
}

export type ProductItemsType = ProductItemType[];
