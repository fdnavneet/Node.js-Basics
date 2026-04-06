import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  const [loading, setLoading] = useState(true)
  const navigate=useNavigate()
  useEffect(() =>{
    async function chechUser(){
      try {
        await axios.get("http://localhost:3000/api/auth/protectedRoutes",
          {withCredentials:true}
        )
        setLoading(false)
      } catch {
        setLoading(false)
        navigate("/")
      }
    }
   chechUser()

    
  },[navigate])
  if(loading) return <p>Loading.......</p>
  return children
}

export default ProtectedRoutes