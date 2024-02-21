import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name: 'cart',
    initialState: { 
        items: [],
        totalQuantity: 0,
        totalAmount: 0

     },
    reducers: {
        addItemToCart(state, action) {
            console.log(state, action);
            const newItem = action.payload
            const existing = state.items.find(item => item.id === newItem.id);
            if (!existing) {
                state.items.push({
                    itemId: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            }
            else {
                existing.quantity++;
                existing.totalPrice= existing.totalPrice+newItem.price
            }
            
       }
    }
});
export const uiActions = cartSlice.actions;
export default cartSlice;