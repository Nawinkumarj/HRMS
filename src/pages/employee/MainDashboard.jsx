import WeatherCard from '../../components/WeatherCard'
import ProfileCard from '../../components/ProfileCard'
import BirthdayCard from '../../components/BirthdayCard'
import HolidayCard from '../../components/HolidayCard'
import CheckInOut from '../../components/CheckInOut'
import PerformanceChart from '../../components/PerformanceChart'
import MiniCalendar from '../../components/MiniCalendar'
import { AttendanceProvider } from '../../context/AttendanceContext'
import Assets  from '../../components/Assets'
import Hiring from '../../components/Hiring'
import ProgressBar from '../../components/ProgressBar'
import Task from '../../components/Task'

const MainDashboard = () => {
  return (
    <div className='MainDashboard'>

      {/* Top Section */}
      <div className='TopSection'>
        <div>
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
          <WeatherCard />
        </div>
      </div>

      {/* 2nd Section */}
      <div className='MiddleSection'>
        <div>
          <Assets />
        </div>
        <div>
          <PerformanceChart />
        </div>
        <div>
          <MiniCalendar />
        </div>
      </div>
      <div className="ThirdSection">
        <div>
          <Hiring />
        </div>
        <div>
          <ProgressBar/>
        </div>
      <div>
        <Task/>
      </div>
        <div>
          
        </div>
        
      </div>

    </div>
  )
}

export default MainDashboard