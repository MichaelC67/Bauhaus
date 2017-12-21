import React from 'react';
import DatePicker from 'react-16-bootstrap-date-picker';
import { dictionary } from 'js/utils/dictionary';

function DatePickerRmes({ value, onChange, placement }) {
	const days = dictionary.calendar.days;
	const months = dictionary.calendar.months;

	return (
		<DatePicker
			className="form-control"
			value={value}
			calendarPlacement={placement}
			onChange={onChange}
			weekStartsOn={1}
			dayLabels={days}
			monthLabels={months}
		/>
	);
}

export default DatePickerRmes;