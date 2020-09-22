import reducer from "./reducers/reducers";
import { createStore } from "redux";

const initialState = {
  selectedMonth: new Date().getMonth(),
  selectedDate: new Date()
};
/* --- STORE --- */
const store = createStore(reducer, initialState);

export default { store, initialState };
