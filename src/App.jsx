import Login from './pages/Login'
import EmployeeDashboard from './pages/employee/employeeDashboard';
import Hr from './pages/hr/HrAdmin'
import Admin from './pages/admin/Admin'
import SuperAdmin from './pages/superAdmin/SuperAdmin'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/employee/*' element={<EmployeeDashboard />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/hr/*' element={<Hr />} />
          <Route path='/superadmin/*' element={<SuperAdmin />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App