import ProfileCard from '../../components/ProfileCard'
import WeatherCard from '../../components/WeatherCard'
import DailyReport from '../../components/DailyReport'
import { AttendanceProvider } from '../../context/AttendanceContext'
import CheckInOut from '../../components/CheckInOut'
import BirthdayCard from '../../components/BirthdayCard'
import HolidayCard from '../../components/HolidayCard'
import Assets from '../../components/Assets'
// import { Calendar } from 'rsuite'
import OurTeam from './../../components/OurTeam'
import Schedule from '../../components/Schedule'
import TaskList from '../../components/TaskList'

const MainAdmin = () => {
  return (
    <div className='MainAdmin'>

      {/* TOP SECTION */}
      <div className='TopSection'>
        <div className='main-dashboard'>
            <ProfileCard />
        </div>
        <div>
          <AttendanceProvider>
          <CheckInOut />
          </AttendanceProvider>
        </div>
        <div className='col3'>
          <BirthdayCard />
          <HolidayCard />
        </div>
        <div>
          <TaskList/>
        </div>
      </div>

      {/* 2nd Section */}
      <div className='SecondSection'>
          <div className="Assets">
            <Assets />
            <OurTeam />
          </div>
          <div className='admin-report'>
              <DailyReport />
          </div>
          <div className='admin-report'>
              <Schedule />
              
          </div>

      </div>
    </div>
  )
}

export default MainAdmin
