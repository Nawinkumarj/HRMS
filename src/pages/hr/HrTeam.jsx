import React from 'react'
import EmployeeDetail from '../../components/EmployeeDetail'
import EmployeeList from '../../components/EmployeeList'
import { Routes, Route } from 'react-router-dom'

const HrTeam = () => {
  return (
    <div className='hr-team-container'>
       <EmployeeList viewDetailsLink="/hr/TeamMember/employee-detail/view" />
    </div>
  )
}

export default HrTeam
