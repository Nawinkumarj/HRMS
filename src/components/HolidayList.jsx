import React from 'react';
import { holidays } from '../data/holidays';

const HolidayList = () => {
  // Group holidays by year
  const holidaysByYear = holidays.reduce((acc, holiday) => {
    const year = new Date(holiday.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(holiday);
    return acc;
  }, {});

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    return { day, month, weekday, fullDate: date };
  };

  // Check if holiday is upcoming
  const isUpcoming = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const holidayDate = new Date(dateString);
    return holidayDate >= today;
  };

  return (
    <div className="holiday-list-container">
      <div className="holiday-list-header">
        <h1 className="holiday-list-title">Company Holidays</h1>
        <p className="holiday-list-subtitle">
          Complete list of holidays for {Object.keys(holidaysByYear).join(' & ')}
        </p>
      </div>

      {Object.entries(holidaysByYear).map(([year, yearHolidays]) => (
        <div key={year} className="year-section">
          <h2 className="year-title">{year}</h2>
          <div className="holidays-list">
            {yearHolidays.map((holiday, index) => {
              const { day, month, weekday } = formatDate(holiday.date);
              const upcoming = isUpcoming(holiday.date);

              return (
                <div
                  key={index}
                  className={`holiday-item ${upcoming ? 'upcoming' : 'past'}`}
                >
                  <div className="holiday-date-section">
                    <div className="date-box">
                      <div className="date-day">{day}</div>
                      <div className="date-month">{month.substring(0, 3).toUpperCase()}</div>
                    </div>
                  </div>

                  <div className="holiday-details">
                    <h3 className="holiday-title">{holiday.title}</h3>
                    <p className="holiday-day">{weekday}</p>
                  </div>

                  {upcoming && (
                    <div className="upcoming-badge">Upcoming</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HolidayList;
