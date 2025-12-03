import Login from './pages/Login'
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import Hr from './pages/hr/HrAdmin'
import Admin from './pages/admin/Admin'
import SuperAdmin from './pages/superAdmin/SuperAdmin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppProviders from './context/AppContent';

const App = () => {
  return (
    <div>
      <ToastContainer />
   <AppProviders>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/employee/*' element={<EmployeeDashboard />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/hr/*' element={<Hr />} />
          <Route path='/superadmin/*' element={<SuperAdmin />} />
        </Routes>
   </AppProviders>
    </div>
  )
}

export default App