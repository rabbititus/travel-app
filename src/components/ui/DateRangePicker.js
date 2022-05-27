import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ getDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      getDates(startDate, endDate);
    }
  }, [startDate, endDate, getDates]);

  return (
    <>
      <DatePicker
        className="form-control mb-3"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        fixedHeight
        required
      />
      <DatePicker
        className="form-control"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        fixedHeight
        required
      />
    </>
  );
};

export default DateRangePicker;
