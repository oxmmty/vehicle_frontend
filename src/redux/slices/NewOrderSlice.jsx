import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userEmail: null,
};

export const NewOrderSlice = createSlice({
  name: "NewOrderSlice",
  initialState,
  reducers: {
    setNewOrder: (state, action) => {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
    },
  },
});

export const { setNewOrder } = NewOrderSlice.actions;

export default NewOrderSlice.reducer;
