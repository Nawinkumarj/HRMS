import React from 'react'
import { useNavigate } from 'react-router-dom'


const TeamCard = ({teamName, teamCount}) => {
      const navigate = useNavigate();

     const handleClick = () => {
      navigate(path); 
    };
    
  return (
    <div className='teamcard-main'>
          <div className='teamcard-section'>
              <div>
                  <h1>{teamName}</h1>
                  <h1>{teamCount}</h1>
                  <p onClick={handleClick}>View Details</p>
              </div>
          </div>
    </div>
  )
}

export default TeamCard