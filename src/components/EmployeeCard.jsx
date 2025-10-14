import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmployeeCard = ({ heading, value, path }) => {
      const navigate = useNavigate();

     const handleClick = () => {
      navigate(path); 
    };


  return (
    <div className='empCard-main'>
        <div className='empCard-details '>
            <div className="empCard-design"></div>
              <h1>{heading}</h1>
              <h2>{value}</h2>
              <p onClick={handleClick}>View Details</p>                
        </div>
    </div>
  )
}

export default EmployeeCard