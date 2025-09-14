import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const Protected = ({children}) => {

    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    if (!user) {
    return <Navigate to="/login" replace />;
  }
    return children
  
}

export default Protected
