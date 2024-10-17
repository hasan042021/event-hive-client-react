import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDaysIcon, FunnelIcon } from "@heroicons/react/24/solid"; // Use heroicons for calendar and filter icons

const MyDateRangePicker = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateRangeChange(start, end);
  };

  const handleFilter = () => {
    if (startDate && endDate) {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      // Example: Log or process the selected date range
      console.log(
        `Filtering data from ${formattedStartDate} to ${formattedEndDate}`
      );
      setShowCalendar(false);
    } else {
      alert("Please select a valid date range.");
    }
  };
  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange(null, null); // Notify parent component about the cleared dates
  };

  return (
    <div className="font-serif flex items-center space-x-4 mt-2">
      {/* Date Range Input and Calendar Button */}
      <div className="relative flex items-center space-x-2">
        <input
          className="w-60 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none font-sans"
          value={
            startDate && endDate
              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              : "Select date range"
          }
          readOnly
        />

        {/* Calendar Button */}
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg focus:outline-none"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CalendarDaysIcon className="h-6 w-6" />
        </button>

        {/* DatePicker: Displays inline when clicking the calendar button */}
        {showCalendar && (
          <div className="absolute top-12 z-50">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              className="shadow-lg rounded-lg border border-gray-300"
              onClickOutside={() => setShowCalendar(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDateRangePicker;
