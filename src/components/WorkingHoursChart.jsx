import { useState } from 'react';

const WorkingHoursChart = () => {
    const [tooltip, setTooltip] = useState({ visible: false, data: null, x: 0, y: 0 });

    const data = [
        { day: "Emp-1", send: 800, received: 1100 },
        { day: "Emp-2", send: 650, received: 450 },
        { day: "Emp-3", send: 1256, received: 680 },
        { day: "Emp-4", send: 700, received: 500 },
        { day: "Emp-5", send: 800, received: 500 },
        { day: "Emp-6", send: 400, received: 500 },
        { day: "Emp-7", send: 1000, received: 500 },
    ];

    const handleHover = (e, dayData) => {
        setTooltip({
            visible: true,
            data: dayData,
            x: e.pageX + 10,
            y: e.pageY + 10,
        });
    };

    const handleLeave = () => {
        setTooltip({ visible: false, data: null, x: 0, y: 0 });
    };

    return (
        <div className="message-chart-container">
            <div className="message-header">
                <div>
                    <p className="message-title">Messages</p>
                    <div className="message-count">
                        <p className="message-total">23,456</p>
                        <span className="message-change">+ 3%</span>
                    </div>
                </div>
            </div>
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-square legend-send"></div>
                    <p className="legend-label">Send</p>
                </div>
                <div className="legend-item">
                    <div className="legend-square legend-received"></div>
                    <p className="legend-label">Received</p>
                </div>
            </div>
            <div className="chart">
                <div className="chart-grid">
                    {data.map((day, idx) => (
                        <div
                            key={idx}
                            className="chart-bar"
                            onMouseEnter={(e) => handleHover(e, day)}
                            onMouseLeave={handleLeave}
                        >
                            <div
                                className="chart-bar-send"
                                style={{ height: `${day.send / 10}px` }}
                            ></div>
                            <div
                                className="chart-bar-received"
                                style={{ height: `${day.received / 10}px` }}
                            ></div>
                            <span className="chart-day">{day.day}</span>
                        </div>
                    ))}
                </div>
                <div className="chart-lines">
                    <hr className="chart-line" />
                    <hr className="chart-line" />
                    <hr className="chart-line" />
                    <hr className="chart-line" />
                    <hr className="chart-line" />
                    <hr className="chart-line" />
                </div>
            </div>
            {tooltip.visible && tooltip.data && (
                <div
                    className="tooltip"
                    style={{ left: tooltip.x, top: tooltip.y }}
                >
                    <div className="tooltip-date">{new Date().toDateString()}</div>
                    <div className="tooltip-content">
                        <div className="tooltip-row">
                            <div className="tooltip-item">
                                <div className="tooltip-square tooltip-send"></div>
                                <p className="tooltip-label">Send</p>
                            </div>
                            <div className="tooltip-value">{tooltip.data.send}</div>
                        </div>
                        <div className="tooltip-row">
                            <div className="tooltip-item">
                                <div className="tooltip-square tooltip-received"></div>
                                <p className="tooltip-label">Received</p>
                            </div>
                            <div className="tooltip-value">{tooltip.data.received}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkingHoursChart;
