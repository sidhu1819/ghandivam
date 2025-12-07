import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../src/context/AuthContext'
import Login from '../src/pages/Login'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(<App />)
