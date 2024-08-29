import React from 'react';
import DatePicker from 'react-datepicker';
import { FormControl, InputGroup } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

const PickTheDate = ({ selectedDate, handleDateChange }) => {

  return (
    <InputGroup>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={<FormControl />}
        dateFormat="MM/dd/yyyy"
        isClearable
        placeholderText="Select a date"
      />

    </InputGroup>
  );
};

export default PickTheDate;