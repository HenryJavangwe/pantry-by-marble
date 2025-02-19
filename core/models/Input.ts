import { KeyboardTypeOptions } from "react-native";

export interface InputProps {
  placeholder: string;
  value: string;
  errorMessage?: string;
  styles?: Record<string, string | number>;
  containerStyles?: Record<string, string | number>;
  iconSource?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: string;
  autoCorrect?: boolean;
  iconName?: "cross" | "search" | "hide";
  onChange: (value: any) => void;
  onBlur?: () => void;
}
