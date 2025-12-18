import React, { useState } from "react";
import {holidays} from "../data/holidays";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const mockMeetings = {
  "2025-08-04": [
    {
      title: "Meeting with Marketing Team",
      time: "8:00 - 8:45 AM (UTC)",
      avatars: [
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/45.jpg",
        "https://randomuser.me/api/portraits/men/46.jpg"
      ],
      others: 2,
      platform: "On Google Meet",
      category: "Marketing",
      categoryClass: "marketing"
    },
    {
      title: "Meeting with managers",
      time: "9:00 - 9:45 AM (UTC)",
      avatars: [
        "https://randomuser.me/api/portraits/women/51.jpg",
        "https://randomuser.me/api/portraits/men/50.jpg",
        "https://randomuser.me/api/portraits/women/52.jpg"
      ],
      others: 2,
      platform: "On Zoom",
      category: "UI/UX Design",
      categoryClass: "uiux"
    }
  ],
  "2025-08-05": [
    {
      title: "1:1 with Project Manager",
      time: "10:00 - 10:30 AM (UTC)",
      avatars: [
        "https://randomuser.me/api/portraits/men/62.jpg",
      ],
      others: 0,
      platform: "On Teams",
      category: "Management",
      categoryClass: "marketing"
    }
  ]
};

function getDatesForWeek(year, month, startDayIdx = 0, count = 5) {
  let date = new Date(year, month, 1);
  let firstDow = date.getDay();
  let offset = startDayIdx - firstDow;
  if (offset < 0) offset += 7;
  let days = [];
  for (let i = 0; i < count; i++) {
    let weekDate = new Date(year, month, 1 + offset + i);
    days.push(weekDate);
  }
  return days;
}

function pad(val) {
  return val < 10 ? "0" + val : val;
}

const employeeSchedule = () => {
  const [activeTab, setActiveTab] = useState("Meetings");
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(7); // August 0-based
  const weekDates = getDatesForWeek(year, month, 6, 5); // Sat...Wed
  const [selectedDate, setSelectedDate] = useState(weekDates[2]); // Default: Monday



  

  const [searchInput, setSearchInput] = useState("");

  const dateKey = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth()+1)}-${pad(selectedDate.getDate())}`;
  const meetings = mockMeetings[dateKey] || [];

  function changeMonth(dir) {
    let nextDate = new Date(year, month + dir, 1);
    setYear(nextDate.getFullYear());
    setMonth(nextDate.getMonth());
    let week = getDatesForWeek(nextDate.getFullYear(), nextDate.getMonth(), 6, 5);
    setSelectedDate(week[2]);
    setSearchInput(""); // Reset search
  }

  function selectDate(date) {
    setSelectedDate(date);
    setSearchInput(""); // Reset search
  }

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    meeting.time.toLowerCase().includes(searchInput.toLowerCase()) ||
    meeting.platform.toLowerCase().includes(searchInput.toLowerCase())
  );
  console.log(holidays,"Holiday");
  return (
    <div className="schedule-container-employee">
      <div className="schedule-header">
        <div className="header-left">
          <span className="calendar-icon">📅</span>
          <span className="schedule-title">Schedule</span>
        </div>
        <button className="add-event-btn">Add Event</button>
        <button className="see-all-btn">See All</button>
      </div>

      <div className="calendar-bar">
        <button className="arrow-btn" onClick={() => changeMonth(-1)}>&#60;</button>
        <span className="month-label">
          {months[month]} {year}
        </span>
        <button className="arrow-btn" onClick={() => changeMonth(1)}>&#62;</button>
      </div>

      <div className="dates-row">
        {weekDates.map((date, idx) => {
          const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
          const label = `${days[date.getDay()]}`;
          return (
            <div
              className={
                "date-item" +
                ((date.getTime() === selectedDate.getTime()) ? " active" : "")
              }
              key={idx}
              onClick={() => selectDate(date)}
              style={{ cursor: "pointer" }}
            >
              {label}
              <br />
              <span>{pad(date.getDate())}</span>
            </div>
          );
        })}
      </div>

      <div className="search-row">
        <input
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button className="calendar-grid-btn">📅</button>
      </div>

      <div className="tabs-row">
        {[ "Meetings", "Events", "Holiday"].map((tab) => (
          <div
            key={tab}
            className={`tab${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>


      {activeTab === "Meetings" && (
        <>
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting, i) => (
              <div className="meeting-card" key={i}>
                <div className="meeting-title-row">
                  <span className="meeting-title">{meeting.title}</span>
                </div>
                <div className="meeting-time">{meeting.time}</div>
                <div className="meeting-avatars">
                  {meeting.avatars.map((avatar, idx) => (
                    <img src={avatar} alt={`Avatar${idx}`} key={idx} />
                  ))}
                  {meeting.others > 0 && (
                    <span className="more-avatars">+{meeting.others}</span>
                  )}
                </div>
                <div className="meeting-footer">
                  <span className="meeting-platform">{meeting.platform}</span>
                  <span className={`meeting-category ${meeting.categoryClass}`}>
                    {meeting.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="meeting-card">
              <div className="meeting-title-row">
                <span className="meeting-title">
                  {searchInput
                    ? "No meetings match your search."
                    : "No meetings scheduled."
                  }
                </span>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "Events" && (
        <div className="meeting-card">
          <div className="meeting-title-row">
            <span className="meeting-title">No events scheduled for this date.</span>
          </div>
        </div>
      )}

      {activeTab === "Holiday" && (
        <div className="meeting-card">
          <div className="meeting-title-row">
            <span className="meeting-title">No holidays on this date.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default employeeSchedule;
