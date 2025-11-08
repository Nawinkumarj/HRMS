import React, { useState } from "react";
import { holidays } from "../data/holidays";

const HolidayCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Filter holidays for the current month
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

  // Format holiday dates for quick lookup
  const holidayMap = monthlyHolidays.reduce((acc, h) => {
    const day = new Date(h.date).getDate();
    acc[day] = h;
    return acc;
  }, {});

  const generateCalendarDays = () => {
    const days = [];

    // Empty slots before the 1st day
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Actual days
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
          title={holiday ? holiday.title : ""}
        >
          <div className="day-number">{day}</div>
          {holiday && (
            <div className="holiday-label">
              🎉 {holiday.title}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
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

      <style jsx>{`
        .holiday-calendar-container {
          background: #f8fafc;
          padding: 2rem;
          font-family: "Inter", sans-serif;
          border-radius: 12px;
          max-width: 850px;
          margin: 2rem auto;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .calendar-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
        }

        .calendar-header button {
          background: #3b82f6;
          border: none;
          color: white;
          font-size: 1.2rem;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          cursor: pointer;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
          text-align: center;
        }

        .weekday {
          font-weight: 600;
          color: #475569;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .day {
          background: white;
          border-radius: 10px;
          padding: 0.75rem;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s;
        }

        .day:hover {
          transform: translateY(-3px);
        }

        .day-number {
          font-weight: 600;
          color: #1e293b;
          font-size: 1.1rem;
        }

        .today {
          border: 2px solid #3b82f6;
        }

        .holiday {
          background: #dcfce7;
          border: 1px solid #86efac;
        }

        .holiday-label {
          font-size: 0.8rem;
          color: #166534;
          font-weight: 600;
          margin-top: 0.25rem;
        }

        .empty {
          visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default HolidayCalendar;
