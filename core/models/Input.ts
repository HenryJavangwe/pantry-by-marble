import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export interface InputProps {
  placeholder: string;
  onChange: (value: any) => void;
  value: string;
  styles?: Record<string, string | number>;
  containerStyles?: Record<string, string | number>;
  iconSource?: string;
  keyboardType?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: string;
  autoCorrect?: boolean;
  iconName?: "cross" | "search" | "hide";
}
