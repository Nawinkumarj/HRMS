import React, { useEffect } from "react";
import { Calendar, Badge, Divider, HStack } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { holidays } from "../data/holidays";
import { useAttendance } from "../context/AttendanceContext";
import "./../Styles/Sethu.css"; 


const CalendarApp = () => {
  const { attendanceRecords } = useAttendance();

  // Remove RSuite default tooltip/selection side effects (optional)
  useEffect(() => {
    const removeAttributes = () => {
      const cells = document.querySelectorAll(".rs-calendar-table-cell");
      cells.forEach((cell) => {
        cell.removeAttribute("title");
        cell.setAttribute("aria-selected", "false");
        cell.classList.remove("rs-calendar-table-cell-selected");
      });
    };

    const observer = new MutationObserver(removeAttributes);
    const calendarTable = document.querySelector(".rs-calendar-table");
    if (calendarTable) {
      observer.observe(calendarTable, { childList: true, subtree: true });
    }

    removeAttributes();
    return () => observer.disconnect();
  }, []);

  const dateToKey = (date) => date.toISOString().split("T")[0];

  const renderCell = (date) => {
    const dateKey = dateToKey(date);

    // Holiday check
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const holiday = holidays.find((h) => h.date === dateString);

    if (holiday) {
      return (
        <div className="holidayCell">
          <Badge className="holidayBadge" content={holiday.title} placement="right" />
        </div>
      );
    }

    const record = attendanceRecords[dateKey];

    // Present
    if (record?.status === "present") {
      return (
        <div className="cellDotWrapper">
          <div className="presentDay" title="Present" />
        </div>
      );
    }

    // Leave (if past and no record or explicit leave)
    const today = new Date();
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isPast = dateOnly < todayOnly;

    if (record?.status === "leave" || (isPast && !record)) {
      return (
        <div className="cellDotWrapper">
          <div className="leaveDay" title="Absent" />
        </div>
      );
    }

    return null;
  };

  // Prevent date selection
  const handleSelect = (date, event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
  };

  return (
    <div className="miniCalendar-container card">
      <div className="calendarHeader">
        <h4>Attendance Calendar</h4>
        <div className="legend">
          <span><span className="legendDot presentLegend" /> Present</span>
          <span><span className="legendDot leaveLegend" /> Absent</span>
          <span><span className="legendDot holidayLegend" /> Holiday</span>
        </div>
      </div>

      <HStack wrap divider={<Divider vertical />} spacing={20}>
        <div className="calendarWrapper">
          <Calendar
            className="mini-calendar"
            compact
            renderCell={renderCell}
            value={null}
            onSelect={handleSelect}
          />
        </div>
      </HStack>
    </div>
  );
};

export default CalendarApp;
