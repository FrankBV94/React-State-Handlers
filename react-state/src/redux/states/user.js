import { createSlice } from "@reduxjs/toolkit";

export const UserEmptyState = {
  name: "",
  email: "",
};

/**
 * "slice" es el equivalente de redux-toolkit al "state"
 * "reducers"es una función que toma el estado anterior y una acción, y devuelve en nuevo estado
 */
export const userSlice = createSlice({
  name: "user",
  initialState: UserEmptyState,
  reducers: {
    /**
     *
     * @param {*} state - representa el valor actual del slice
     * @param {*} action - lo que se va a realizar sobre el state
     * @returns payload - valor con el que se va a realizar la accion. Reemplaza el contenido del state
     */
    createUser: (state, action) => {
      return action.payload;
    },
    modifyUser: (state, action) => {
      /**
       * contiene todo lo del state pero reemplaza las propiedades contenidas en el payload
       */
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return UserEmptyState;
    },
  },
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;
