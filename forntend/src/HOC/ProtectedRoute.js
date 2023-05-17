import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
     const auth = localStorage.getItem('token')
     return auth ? <Navigate to='/dashboard' /> : children
}

export default ProtectedRoute