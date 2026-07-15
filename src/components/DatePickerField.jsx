import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

const DatePickerField = ({ value, onChange }) => {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      isClearable
      placeholderText="dd/MM/yyyy"
    />
  );
};

export default DatePickerField;
