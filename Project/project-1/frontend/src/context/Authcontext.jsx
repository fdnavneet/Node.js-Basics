import { createContext,useState,useEffect } from "react";
import axios from "axios"


const Authcontext= createContext()

function Authprovider({children}){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

 useEffect(() =>{
   async function checkUser(){
    try {
    const res= await axios.get("http://localhost:3000/api/auth/protectedRoutes",{
      withCredentials:true
    })
    setUser(res.data.user)
  } catch (error) {
    console.log(error)
    setUser(null)
  } finally {
    setLoading(false)
  }
   }
   checkUser()
 },[])
  return (
    <Authcontext.Provider value={{user,setUser,loading}}>
      {children}
    </Authcontext.Provider>
  )
}
export {Authcontext,Authprovider}