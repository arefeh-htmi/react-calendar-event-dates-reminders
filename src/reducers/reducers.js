import initialState from "../store";
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_MONTH":
      return {
        ...state,
        selectedMonth: payload.selectedMonth
      };
    case "CHANGE_DATE":
      const month = new Date(payload.selectedDate).getMonth();

      return {
        ...state,
        selectedMonth: month,
        selectedDate: payload.selectedDate
      };
    default:
      return state;
  }
};
export default reducer;
