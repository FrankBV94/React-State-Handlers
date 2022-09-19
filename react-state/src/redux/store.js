import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/user";

/**
 * configureStore - Almacena los "state"
 * reducer - Colecion de todos los reducers de los state
 */
export const TakStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
