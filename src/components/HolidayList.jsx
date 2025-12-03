import React, { useState } from "react";
import { holidays } from "../data/holidays";
import "./../Styles/Sethu.css"; 

const HolidayCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthlyHolidays = holidays.filter((holiday) => {
    const date = new Date(holiday.date);
    return (
      date.getFullYear() === currentYear && date.getMonth() === currentMonth
    );
  });

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentYear, currentMonth - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentYear, currentMonth + 1, 1)
    );
  };

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const holidayMap = monthlyHolidays.reduce((acc, h) => {
    const day = new Date(h.date).getDate();
    acc[day] = h;
    return acc;
  }, {});

  const generateCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const holiday = holidayMap[day];
      const today = new Date();
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;

      days.push(
        <div
          key={day}
          className={`day ${holiday ? "holiday" : ""} ${
            isToday ? "today" : ""
          }`}
        >
          <div className="day-number">{day}</div>
          {holiday && (
            <div className="holiday-label">
               {holiday.title}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-wrapper">
      {/* LEFT: Calendar */}
      <div className="holiday-calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth}>‹</button>
          <h2>{monthName}</h2>
          <button onClick={nextMonth}>›</button>
        </div>

        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="weekday">
              {d}
            </div>
          ))}
          {generateCalendarDays()}
        </div>
      </div>

      {/* RIGHT: Holiday List */}
      <div className="holiday-list">
        <h3>Holidays in {monthName}</h3>

        {monthlyHolidays.length === 0 ? (
          <p className="no-holidays">No holidays this month.</p>
        ) : (
          monthlyHolidays.map((h, idx) => {
            const date = new Date(h.date);
            return (
              <div key={idx} className="holiday-item">
                <div className="holiday-date">
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="holiday-title">{h.title}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HolidayCalendar;
 