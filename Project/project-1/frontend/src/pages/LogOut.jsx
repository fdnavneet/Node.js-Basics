import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {
  const navigate=useNavigate()
  async function logoutHandler(){
    try {
      await axios.post("http://localhost:3000/api/auth/logOut",{},{
        withCredentials:true
      })
      navigate("/")
    } catch (error) {
      
    }
  }
  return (
    <div>
      <button onClick={logoutHandler}>LogOut</button>
    </div>
  )
}

export default LogOut