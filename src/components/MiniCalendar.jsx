import React, { useEffect } from "react";
import { Calendar, Badge, Divider, HStack } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { holidays } from "../data/holidays";

const CalendarApp = () => {
  useEffect(() => {
    const removeAttributes = () => {
      const cells = document.querySelectorAll(".rs-calendar-table-cell");
      cells.forEach((cell) => {
        cell.removeAttribute("title"); // Remove tooltip
        cell.setAttribute("aria-selected", "false"); // Reset selection
        cell.classList.remove("rs-calendar-table-cell-selected"); // Remove selected styles
      });
    };

    // Observe changes in the calendar DOM
    const observer = new MutationObserver(removeAttributes);
    const calendarTable = document.querySelector(".rs-calendar-table");
    if (calendarTable) {
      observer.observe(calendarTable, { childList: true, subtree: true });
    }

    // Initial cleanup
    removeAttributes();

    // Cleanup observer
    return () => observer.disconnect();
  }, []);

  const renderCell = (date) => {
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const holiday = holidays.find((holiday) => holiday.date === dateString);

    return holiday ? (
      <div className="holidayCell">
        <Badge className="holidayBadge" content={holiday.title} />
      </div>
    ) : null;
  };

  const handleSelect = (date, event) => {
    // Prevent the selection action
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="miniCalendar-container">
      <HStack wrap divider={<Divider vertical />} spacing={20}>
        <div className="calendarWrapper">
          <Calendar
            className="mini-calendar"
            compact
            renderCell={renderCell}
            value={null} // Prevent default date selection
            onSelect={handleSelect} // Intercept date selection attempts
          />
        </div>
      </HStack>
    </div>
  );
};

export default CalendarApp;
