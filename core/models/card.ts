export interface CardProps {
  imageSource?: string;
  title?: string;
  price?: string;
  onCardPress?: () => void;
  onButtonPress?: () => void;
  containerStyle?: any;
  imageStyle?: any;
  titleStyle?: any;
  priceStyle?: any;
  iconWidth?: number;
  iconHeight?: number;
  quantity?: number;
}
