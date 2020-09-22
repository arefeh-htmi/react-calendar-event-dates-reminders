import React from "react";
import BasicCalendar from "./components/CalendarLayout";
import { Provider } from "react-redux";

import storconf from "./store";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Provider store={storconf.store}>
        <BasicCalendar />
      </Provider>
    </div>
  );
}
