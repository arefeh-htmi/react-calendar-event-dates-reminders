import React from "react";

import { connect } from "react-redux";
import classnames from "classnames";
import actions from "../actions/actions";
const MONTHS_CON = [
  {
    key: "January",
    short: "Jan."
  },
  {
    key: "February",
    short: "Feb."
  },
  {
    key: "March",
    short: "Mar."
  },
  {
    key: "April",
    short: "Apr."
  },
  {
    key: "May",
    short: "May."
  },
  {
    key: "June",
    short: "Jun."
  },
  {
    key: "July ",
    short: "Jul."
  },
  {
    key: "August",
    short: "Aug."
  },
  {
    key: "September",
    short: "Sep."
  },
  {
    key: "October,",
    short: "Oct."
  },
  {
    key: "November",
    short: "Nov."
  },
  {
    key: "December",
    short: "Dec."
  }
];

class Months extends React.PureComponent {
  renderItem = (item, index) => {
    const { changeSelectedMonth, selectedMonth } = this.props;
    const month = index;
    const cls = classnames("month", {
      active: month === selectedMonth
    });

    return (
      <div
        className={cls}
        key={month}
        onClick={(e) => changeSelectedMonth(month)}
      >
        {item.short}
      </div>
    );
  };
  render() {
    return (
      <section className="months">
        {MONTHS_CON.map(this.renderItem)}
        <span className="indicator" />
      </section>
    );
  }
}

export const ConnectedMonths = connect(
  (state) => {
    return {
      selectedMonth: state.selectedMonth
    };
  },
  (dispatch) => {
    return {
      changeSelectedMonth: (month) => {
        dispatch(actions.changeSelectedMonth(month));
      }
    };
  }
)(Months);
