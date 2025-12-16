import React from 'react'
import { useParams } from 'react-router-dom'
import EmployeeDetails from '../../components/EmployeeDetail'
import { useEmployees } from '../../context/EmployeesContext'

const HrTeamDetail = () => {
  const { id } = useParams();
  const { employees } = useEmployees();
  const employee = id ? employees.find(e => e.id === Number(id)) : undefined;

  return (
    <div className='hrteam-detail-container'>
        <EmployeeDetails employee={employee} />
    </div>
  )
}

export default HrTeamDetail
