import { createSlice } from "@reduxjs/toolkit";
//create a new file containing a slice for cards that:
//is named 'cardsSlice'
export const cardsSlice = createSlice({
//has initial state consisting of an object that includes one property, cards,
//which corresponds to an empty object
//this inner cards object will eventually hold all cards keyed by id
name: "cards",
initialState: {
    cards: {}
},
//has an addCard action - this action will receive a payload of the form
//{id: "123", front: "front of card", back: "back of card"}
reducers: {
    addCard: (state, action) => {
    const { id } = action.payload;
    state.cards[id] = action.payload;
} 
}
})
//has a selector that returns a card with the given id
export const selectCardById = (id) => (state) => state.cards.cards[id];
export const { addCard } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;