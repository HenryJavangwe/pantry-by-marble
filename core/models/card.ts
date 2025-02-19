import { Product } from "./products";

export interface CardProps {
  product: Product;
  onCardPress?: () => void;
  onRemoveFromCart?: () => void;
  onDecrementQuantity?: () => void;
  onIncrementQuantity?: () => void;
  containerStyle?: {
    [key: string]: number | string;
  };
  imageStyle?: any;
  titleStyle?: any;
  priceStyle?: any;
  iconWidth?: number;
  iconHeight?: number;
  quantity?: number;
}
