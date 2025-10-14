import React, { useState } from "react";
import { assets } from "../assets/assets";

const Assets = () => {
  const [openSection, setOpenSection] = useState("device1");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="assets">
      <div className="asset-details">
        {/* Device Section */}
        <div className="asset-dropdown-section">
          <div className="asset-dropdown-header" onClick={() => toggleSection("device1")} >
            <p>Device</p>
            <img src={assets.dd} alt="" className="asset-dropdown-img" />
          </div>
          {openSection === "device1" && (
            <div className="asset-dropdown-content">
              {/* Macbook Details */}
              <div className="device-detail">
                <img src={assets.m1} alt="Macbook" className="asset-device-img" />
                <div className="device-type">
                  <p className="device-os">Macbook</p>
                  <p className="device-version">Version M4 Pro max</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="asset-dropdown-section">
          <div className="asset-dropdown-header" onClick={() => toggleSection("device2")} >
            <p>Device</p>
            <img src={assets.dd} alt="" className="asset-dropdown-img" />
          </div>
          {openSection === "device2" && (
            <div className="asset-dropdown-content">
              {/* Windows Details */}
              <div className="device-detail">
                <img
                  src={assets.w1}
                  alt="Windows"
                  className="asset-device-img"
                />
                <div className="device-type">
                  <p className="device-os">Windows</p>
                  <p className="device-version">Version i7</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payslip Section */}
        <div className="asset-dropdown-section">
          <div className="asset-dropdown-header" onClick={() => toggleSection("payslip")} >
            <p>Payslip</p>
            <img src={assets.dd} className="asset-dropdown-img" />
          </div>
          {openSection === "payslip" && (
            <div className="asset-dropdown-content">
              <div className="payslip-detail">
                <img src={assets.ps} alt="Payslip" className="asset-payslip-img" />
                <button> <img src={assets.psd} className="asset-payslip-download-img" alt="" /> Download Payslip</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assets;
