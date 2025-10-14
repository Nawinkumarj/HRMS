import React from 'react'
import { assets } from '../assets/assets'
import { users } from '../data/User'

const BirthdayCard = () => {

  const getTodayBirthday = (users) => {
    const today = new Date();
    const todayMonthDay = `${today.dayMonth() + 1} - ${today.getDate()}`;

    return users.filter((member) => {
      const [year, month, day] = member.birthday.split("-")
      return `${month}-${day}` === todayMonthDay;
    });
  }

  // const todayBirthday = getTodayBirthday(users)
  
  return (
    <div className='BirthdayContainer flex-center'>
        <h1>Birthday</h1>
        <img src={assets.profileImg} alt="" />
        <p>Prabhu V</p>
        <span>Frontend Developer</span>

        <div className='partyIconContainer'>
          <img src={assets.partyPopper_Icon} alt="" />
          <img src={assets.partyPopper_Icon} alt="" />
        </div>

        <button className='sendWishesBtn'>Send Wishes</button>
    </div>
  )
}

export default BirthdayCard