import { useContext } from "react";
import { Authcontext } from "../context/Authcontext";
import {Navigate} from "react-router-dom"


function protectedRoute({children}){
  const {user,loading} = useContext(Authcontext)

  if(loading) return <div>Loading....</div>
  if(!user){
    return <Navigate to='/' />
  }
  return children
}
export default protectedRoute