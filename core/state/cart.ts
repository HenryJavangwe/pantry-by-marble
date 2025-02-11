import { create } from "zustand";
import { Product } from "../models";

interface CartState {
  cartItems: {
    product: Product;
    quantity: number;
  }[];
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  decrementQuantity: (item: Product) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (item: Product) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product.id === item.id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            if (cartItem.product.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              };
            }
            return cartItem;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { product: item, quantity: 1 }],
        };
      }
    });
  },
  removeFromCart: (item: Product) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product.id === item.id
      );

      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            if (cartItem.product.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.product.id !== item.id
          ),
        };
      }
    });
  },
  decrementQuantity: (item: Product) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.product.id === item.id
      );

      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            if (cartItem.product.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.product.id !== item.id
          ),
        };
      }
    });
  },
}));