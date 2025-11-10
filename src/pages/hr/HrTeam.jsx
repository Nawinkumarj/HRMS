import React from 'react'
import EmployeeList from '../../components/EmployeeList'

import { useNavigate } from 'react-router-dom'

const HrTeam = () => {
  const navigate = useNavigate();
  return (
    <div className='hr-team-container'>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <h2>Team Members</h2>
        <button className='emp-list-btn-secondary' onClick={() => navigate('/hr/TeamMember/employee-detail/new')}>
          + Add Employee
        </button>
      </div>
      <EmployeeList viewDetailsLink="/hr/TeamMember/employee-detail/view" />
    </div>
  )
}

export default HrTeam
