import React from "react";
import { assets } from "../assets/assets";

const EmployeeAttendance = ({ value, heading }) => {
  return (
    <div className="empAttendance-main">
      <div className="empAttendance-card">
        <div className="empAttendance-details">
          <div className="empAttendance-value">
            <img src={assets.darkIcon} alt="" />
            <h1>{value}</h1>
          </div>
          <p>{heading}</p>
        </div>
        <div className="empAttendance-details">
          <div className="empAttendance-value">
            <img src={assets.darkIcon} alt="" />
            <h1>{value}</h1>
          </div>
          <p>{heading}</p>
        </div>

        <div className="empAttendance-details">
          <div className="empAttendance-value">
            <img src={assets.darkIcon} alt="" />
            <h1>{value}</h1>
          </div>
          <p>{heading}</p>
        </div>
        <div className="empAttendance-details">
          <div className="empAttendance-value">
            <img src={assets.darkIcon} alt="" />
            <h1>{value}</h1>
          </div>
          <p>{heading}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
