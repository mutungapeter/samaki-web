
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  qty: number;
  price: number;
  name: string;
  image: string;
  stock:number;
}
interface CartState {
  cart: CartItem[];
  totalPrice: number;
}
const initialState: CartState = {
  cart: [],
  totalPrice: 0,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart(state, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload;
      state.totalPrice = action.payload.reduce(
        (acc, item) => acc + item.qty * item.price,
        0
      );
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i.id === item.id);

      if (isItemExist) {
        state.cart = state.cart.map((i) => (i.id === isItemExist.id ? item : i));
      } else {
        state.cart.push(item);
        state.totalPrice = state.cart.reduce(
          (acc, item) => acc + item.qty * item.price,
          0
        );
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((i) => i.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
      state.totalPrice = state.cart.reduce(
        (acc, item) => acc + item.qty * item.price,
        0
      );
    },
    updateTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, initializeCart, updateTotalPrice  } = cartSlice.actions;
export default cartSlice.reducer;
