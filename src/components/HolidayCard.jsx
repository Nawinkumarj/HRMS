import React from 'react';
import { useNavigate } from 'react-router-dom';
import { holidays } from '../data/holidays'; // Import your holidays data

const HolidayCard = () => {
  const navigate = useNavigate();

  // Function to get the next upcoming holiday
  const getNextHoliday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    // Filter holidays that are upcoming
    const upcomingHolidays = holidays.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate >= today;
    });

    // Sort by date and get the first one
    if (upcomingHolidays.length > 0) {
      upcomingHolidays.sort((a, b) => new Date(a.date) - new Date(b.date));
      return upcomingHolidays[0];
    }

    // If no upcoming holidays in current year, return first holiday of next year
    return holidays[0];
  };

  const nextHoliday = getNextHoliday();

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleViewAll = () => {
    navigate('/employee/HolidayList'); // Navigate to holiday list page
  };

  return (
    <div className='HolidayCardContainer flex-center'>
      <div className='leftSide'>
        <p>Next Holiday</p>
        <span>{nextHoliday.title}, {formatDate(nextHoliday.date)}</span>
      </div>
      <div className='rightSide'>
        <button onClick={handleViewAll}>View All</button>
      </div>
    </div>
  );
};

export default HolidayCard;
