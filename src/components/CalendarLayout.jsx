import React from "react";
import { ConnectedMonths } from "./Month";
import { ConnectedCalendar } from "./Calendar";
import { ConnectedDetail } from "./Detail-Events";
import "./calendar.scss";

export default class BasicCalendar extends React.Component {
  render() {
    return (
      <article className="board">
        <ConnectedMonths />
        <ConnectedCalendar />
        <ConnectedDetail />
      </article>
    );
  }
}
