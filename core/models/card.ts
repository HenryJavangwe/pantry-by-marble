import { Product } from "./products";

export interface CardProps {
  product: Product;
  onCardPress?: () => void;
  onRemoveFromCart?: () => void;
  onDecrementQuantity?: () => void;
  onIncrementQuantity?: () => void;
  containerStyle?: any;
  imageStyle?: any;
  titleStyle?: any;
  priceStyle?: any;
  iconWidth?: number;
  iconHeight?: number;
  quantity?: number;
}

