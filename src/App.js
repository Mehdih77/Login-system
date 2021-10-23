import React from 'react'
import { useAuthState } from './Context/auth-context'
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

export default function App() {

  const {token} = useAuthState();
  
  return (
    <>
    {token ? <Dashboard /> : <Login />}
    </>
    
  )
}
