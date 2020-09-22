/* --- ACTIONS --- */

const actions = {
  changeSelectedMonth: (month) => {
    return {
      type: "CHANGE_MONTH",
      payload: {
        selectedMonth: month
      }
    };
  },
  changeSelectedDate: (date) => {
    return {
      type: "CHANGE_DATE",
      payload: {
        selectedDate: date
      }
    };
  }
};
export default actions;
