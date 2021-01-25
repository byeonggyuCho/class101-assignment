export interface RouteType {
  route: string;
  text: string;
}

export type RoutesType = RouteType[];

export interface ProductType {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
  isAddedToCart?: boolean;
  isChecked?: boolean;
  amount?: number;
}

// export type ProductItemsType = ProductItemType[]; // Remove

export interface CouponType {
  type: string;
  title: string;
  discountRate?: number;
  discountAmount?: number;
}
