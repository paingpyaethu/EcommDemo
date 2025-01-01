import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type CartItem = {
  id: number;
  color: string;
  size: string;
  quantity: number;
};

export type Cart = {
  id: number;
  name: string;
  price: number;
  image: string;
  items: CartItem[];
};

interface CartState {
  cartList: Cart[];
}

const initialState: CartState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Cart>) => {
      const cartItem = action.payload;
      if (state.cartList.length > 0) {
        const existingCartIndex = state.cartList.findIndex(
          cart => cart.id === cartItem.id,
        );
        if (existingCartIndex > -1) {
          state.cartList[existingCartIndex] = cartItem;
        } else {
          state.cartList.push(cartItem);
        }
      } else {
        state.cartList.push(cartItem);
      }
    },
    updateCart: (
      state,
      action: PayloadAction<{ id: number; itemId: number; quantity: number }>
    ) => {
      const { id, itemId, quantity } = action.payload;
      const cartIndex = state.cartList.findIndex((item) => item.id === id);

      if (cartIndex > -1) {
        const itemIndex = state.cartList[cartIndex].items.findIndex(
          (item) => item.id === itemId
        );

        if (itemIndex > -1) {
          state.cartList[cartIndex].items[itemIndex].quantity = quantity;
        }
      }
    },
    deleteCart: (
      state,
      action: PayloadAction<{ id: number; itemId: number }>
    ) => {
      const { id, itemId } = action.payload;
      const cartIndex = state.cartList.findIndex((cart) => cart.id === id);

      if (cartIndex > -1) {
        const items = state.cartList[cartIndex].items;

        if (items.length === 1) {
          // Remove the entire cart if it only has one item
          state.cartList.splice(cartIndex, 1);
        } else {
          // Remove the specific item
          const itemIndex = items.findIndex((item) => item.id === itemId);

          if (itemIndex > -1) {
            items.splice(itemIndex, 1);
          }
        }
      }
    },
  },
  selectors: {
    selectCount: (state: CartState) => {
      return state.cartList.reduce((total, cart) => {
        return (
          total + cart.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0)
        );
      }, 0);
    },
  },
});

export const {addCart, updateCart, deleteCart} = cartSlice.actions;
export const {selectCount} = cartSlice.selectors;

export default cartSlice.reducer;
