import React from 'react'
import { assets } from '../../assets/assets'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {

  const { user } = useAuth();

  return (
    <div className='ProfilePageContainer'>

      <div className='TopBanner'>

        <div>
          <div className='bannerSection'>
            <img src={user?.bannerImg} alt="" className='bannerImg' />
            <div className='profileCard'>
              <img src={assets.profileImg} alt="" className='profileImg' />
              <p className='name'>{user?.name}</p>
              <p className='designation'>{user?.designation}</p>
              <a href={`tel:${user?.phone}`}>
                <span>{user?.phone}</span>
              </a>
            </div>
          </div>

          <div className='profileInfoLeft'>
            <div className='cards leftSide'>
              
            </div>
            <div className='cards rightSide'>RIGHT</div>
          </div>
        </div>

        <div>
          <div className='cards leftSide'>
            <h3>Personal Information</h3>
            <p> <span>Name :</span> {user?.name} </p>
            <p> <span>Designation :</span> {user?.designation} </p>
            <p> <span>Employee ID :</span> {user?.userId} </p>
            <p> <span>Date Of Join :</span> {user?.doj} </p>
            <p> <span>Work Email :</span> {user?.work_email} </p>
            <p> <span>Personal Email :</span> {user?.personal_email} </p>
            <p> <span>DOB :</span> {user?.birthday} </p>
            <p> <span>Address :</span> {user?.address} </p>
            <p> <span>Gender :</span> {user?.gender} </p>
          </div>

          <div className='cards right'>
          <h3>Emergency Contact</h3>
          {user?.emergency_contact?.length > 0 ? (
            user.emergency_contact.map((contact, index) => (
              <div key={index}>
                <p> <span>Name :</span> {contact.name} </p>
                <p> <span>Relationship :</span> {contact.Relationship} </p>
                <p> <span>Phone :</span> {contact.phone} </p>
                <p> <span>Address :</span> {contact.Addres} </p>
              </div>
            ))
          ) : (
            <p>No Emergency Contact</p>
          )}
          </div>
        </div>

      </div>

    </div>
  )
}

export default Profile