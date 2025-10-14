import poc from '../data/poc.json'
import profileImg from '../assets/profile-img.webp'
import profileImg2 from '../assets/sampleProfile.jpg'

const imgMap = {
    'profileImg': profileImg,
    'profileImg2': profileImg2,
}

const DailyReport = () => {
  return (
    <div className="daily-report">
      <h2>Daily Report & POC</h2>
      <table className="daily-report-table">
        <thead className="poc-thead">
          <tr className="daily-report-heading">
            <th>Name</th>
            <th>POC</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {poc.map((entry, index) => (
            <tr key={index} className="daily-report-data">
              <td className="poc-profile">
                <img
                  src={imgMap[entry.img]}
                  alt={`${entry.name}'s profile`}
                  className="poc-profile-img"
                />
                <p>{entry.name}</p>
              </td>
              <td className="poc-content">
                <button>{entry.poc}</button>
              </td>
              <td className="poc-time">{entry.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default DailyReport
