import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import seedEmployees from '../data/employees';

const STORAGE_KEY = 'employees';

const EmployeesContext = createContext(null);

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : seedEmployees;
    } catch (e) {
      console.warn('Failed to read employees from localStorage:', e);
      return seedEmployees;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (e) {
      console.warn('Failed to save employees to localStorage:', e);
    }
  }, [employees]);

  const nextId = useMemo(() => (employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1), [employees]);

  const addEmployee = (data) => {
    const id = nextId;
    const employeeId = `#EMP${String(id).padStart(2, '0')}`;
    const newEmp = { id, employeeId, status: 'Active', workType: 'Fulltime', department: 'General', avatar: '', ...data };
    setEmployees(prev => [...prev, newEmp]);
    return newEmp;
  };

  const updateEmployee = (id, updates) => {
    setEmployees(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  const importEmployees = (list) => {
    if (!Array.isArray(list)) return;
    // Basic normalization
    const normalized = list
      .filter(Boolean)
      .map((e, idx) => ({
        id: typeof e.id === 'number' ? e.id : idx + 1,
        employeeId: e.employeeId || `#EMP${String(idx + 1).padStart(2, '0')}`,
        name: e.name || 'Unnamed',
        position: e.position || 'Employee',
        department: e.department || 'General',
        workType: e.workType || 'Fulltime',
        email: e.email || '',
        phone: e.phone || '',
        joinDate: e.joinDate || '',
        status: e.status || 'Active',
        avatar: e.avatar || '',
      }));
    setEmployees(normalized);
  };

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    importEmployees,
  };

  return <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>;
};

export const useEmployees = () => {
  const ctx = useContext(EmployeesContext);
  if (!ctx) throw new Error('useEmployees must be used within EmployeesProvider');
  return ctx;
};
