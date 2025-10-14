import { assets } from "../assets/assets"
import { useAuth } from "../context/AuthContext"

const ProfileCard = () => {
  const { user } = useAuth()
  const userName = user?.name || "Guest";
  return (
    <div className='profile-card'>
      <div className="profile-box">
        <a href=""><img src={assets.parrow} className="profile-arrow" /></a>
      </div>
      <div className="profile-box">
        <div className="profile-details">
            <p className="profile-card-name">{userName}</p>
            <p className="profile-card-designation">Software developer</p>
            <p className="profile-card-mail"> <img src={assets.pmail} className="pmail-icon" />nawinkumar@outlook.com</p>
            <p className="profile-card-num"><img src={assets.pphone} className="pphone-icon" /> 9876543210</p>
        </div>
      </div>
      <div className="profile-circle">
        <img src={assets.Pimg} alt="User-image" className="profile-img" />
      </div>
    </div>
  )
}

export default ProfileCard
