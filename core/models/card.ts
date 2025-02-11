export interface CardProps {
  imageSource?: string;
  title?: string;
  price?: string;
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
