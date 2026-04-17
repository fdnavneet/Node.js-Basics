import { useContext,useEffect } from "react";
import { getMe, login, logout, register } from "../services/auth.api";
import { AuthContext } from "../auth.context.jsx";



export const useAuth =() =>{
  const context=useContext(AuthContext)
  const {user,setUser,loading,setLoading} = context

  async function handelLogin({userName, password}){
    setLoading(true)
    try {
       const data=await login({userName,password})
       setUser(data.user)
    } catch (error) {
      
    }finally{
      setLoading(false)

    }
   
  }
  async function handelRegister({userName, password, email}){
    setLoading(true)
    try {
      const data=await register({userName, password, email})
    setUser(data.user)
    } catch (error) {
      
    }finally{

      setLoading(false)
    }
    
  }
  async function handelLogout(){
    setLoading(true)
    try {
      const data=await logout()
    setUser(null)
    } catch (error) {
      
    }finally{

      setLoading(false)
    }
    
  }

  useEffect(() =>{
    async function getAndSetUser(){
      const data=await getMe()
      setUser(data.user)
      setLoading(false)
    }
    getAndSetUser()
  },[])
  return {user,loading,handelLogin,handelLogout,handelRegister}
}