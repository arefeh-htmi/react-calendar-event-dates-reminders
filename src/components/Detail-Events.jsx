import { connect } from "react-redux";
import React from "react";
import { format, differenceInDays, lastDayOfYear } from "date-fns";

class Detail extends React.PureComponent {
  render() {
    const { selectedDate } = this.props;
    const remaind = differenceInDays(lastDayOfYear(selectedDate), selectedDate);
    const year = new Date(selectedDate).getFullYear();
    return (
      <section className="detail">
        <h3 className="date-string">
          {format(this.props.selectedDate, "MMM，Do")}
        </h3>
        <p className="remaind">
          {remaind} days from the end of {year}
        </p>
      </section>
    );
  }
}

export const ConnectedDetail = connect((state) => {
  return {
    selectedDate: state.selectedDate
  };
})(Detail);
