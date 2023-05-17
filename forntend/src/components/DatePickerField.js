import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerField = ({ selected, onChange }) => {
     return (
          <DatePicker
               selected={selected}
               onChange={onChange}
               peekNextMonth
               showMonthDropdown
               showYearDropdown
               dropdownMode="select"
               className="form-control"
          />
     );
};

export default DatePickerField;
