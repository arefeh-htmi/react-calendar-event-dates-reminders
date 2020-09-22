import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import actions from "../actions/actions";
import {
  getDaysInMonth,
  getDay,
  lastDayOfMonth,
  addMonths,
  subMonths,
  differenceInWeeks,
  format,
  isSameDay
} from "date-fns";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class Calendar extends React.PureComponent {
  static defaultProps = {
    renderDateSubjects: () => null,
    changeSelectedDate: () => null
  };
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      month: null,
      selectedDate: null,
      dates: []
    };
  }
  static makeMonthDates = (props) => {
    const { year, month } = props;
    const preDates = [];
    const dates = [];
    const nextDates = [];

    const preMonth = subMonths(new Date(year, month), 1);
    const preMonthLastDate = lastDayOfMonth(preMonth);
    let preMonthDayOffset = getDay(preMonthLastDate);
    while (preMonthDayOffset >= 0 && preMonthDayOffset < 6) {
      preDates.push({
        inMonth: false,
        date: new Date(
          `${preMonthLastDate.getFullYear()}-${
            preMonthLastDate.getMonth() + 1
          }-${preMonthLastDate.getDate() - preMonthDayOffset}`
        )
      });
      preMonthDayOffset--;
    }

    const totalDaysInCurrentMonth = getDaysInMonth(new Date(year, month));
    const currentMonthLastDate = new Date(
      `${year}-${month + 1}-${totalDaysInCurrentMonth}`
    );
    for (let day = 1; day < totalDaysInCurrentMonth + 1; day++) {
      dates.push({
        inMonth: true,
        date: new Date(`${year}-${month + 1}-${day}`)
      });
    }
    const nextMonth = addMonths(new Date(year, month), 1);
    const nextMonthFirstDate = new Date(nextMonth.setDate(1));
    let nextMonthDayOffset = 6 - getDay(currentMonthLastDate);
    for (let i = 0; i < nextMonthDayOffset; i++) {
      nextDates.push({
        inMonth: false,
        date: new Date(
          `${nextMonthFirstDate.getFullYear()}-${
            nextMonthFirstDate.getMonth() + 1
          }-${nextMonthFirstDate.getDate() + i}`
        )
      });
    }

    return [...preDates, ...dates, ...nextDates];
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.year !== prevState.year ||
      nextProps.month !== prevState.month ||
      nextProps.selectedDate !== prevState.selectedDate
    ) {
      return {
        year: nextProps.year,
        month: nextProps.month,
        selectedDate: nextProps.selectedDate,
        dates: Calendar.makeMonthDates(nextProps)
      };
    }
    return null;
  }
  renderDate(dateObj) {
    const { changeSelectedDate, renderDateSubjects } = this.props;
    const { selectedDate } = this.state;
    const { date, inMonth } = dateObj;
    const cls = classnames("calendar-date", {
      "in-month": inMonth,
      highlight: inMonth && isSameDay(date, new Date(selectedDate))
    });
    return (
      <div
        className={cls}
        key={date.getTime()}
        onClick={(e) => changeSelectedDate(date)}
      >
        {format(date, "dd")}
        {renderDateSubjects(date)}
      </div>
    );
  }
  renderDay(day) {
    return (
      <div className="calendar-day" key={day}>
        {day}
      </div>
    );
  }
  renderDays() {
    return (
      <header className="calendar-days">
        {DAYS.map((day) => this.renderDay(day))}
      </header>
    );
  }
  renderGrid() {
    return (
      <section className="calendar-grid">
        {this.state.dates.map((date) => this.renderDate(date))}
      </section>
    );
  }
  render() {
    const { dates } = this.state;
    const weeks = differenceInWeeks(
      dates[dates.length - 1].date,
      dates[0].date
    );
    const cls = classnames("calendar", `calendar-${weeks}-weeks`);
    return (
      <article className={cls}>
        {this.renderDays()}
        {this.renderGrid()}
      </article>
    );
  }
}

export const ConnectedCalendar = connect(
  (state) => {
    return {
      year: new Date().getFullYear(),
      month: state.selectedMonth,
      selectedDate: state.selectedDate
    };
  },
  (dispatch) => ({
    changeSelectedDate: (date) => {
      dispatch(actions.changeSelectedDate(date));
    }
  })
)(Calendar);
