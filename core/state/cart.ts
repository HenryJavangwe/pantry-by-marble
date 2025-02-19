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
  calculateTotalPrice: () => number;
  getProcuctQuantity: (item: Product) => number;
}

export const useCartStore = create<CartState>((set, get) => ({
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
  calculateTotalPrice: () => {
    const { cartItems } = get();

    return cartItems.reduce((total, cartItem) => {
      return (total += cartItem.product.price * cartItem.quantity);
    }, 0);
  },
  getProcuctQuantity: (item: Product) => {
    const { cartItems } = get();

    const cartItem = cartItems.find(
      (cartItem) => cartItem.product.id === item.id
    );
    return cartItem ? cartItem.quantity : 0;
  },
}));
