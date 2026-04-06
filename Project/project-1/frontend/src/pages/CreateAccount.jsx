import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate=useNavigate()
  const [message, setmessage] = useState('')
  const [formData, setFormData] = useState({
    userName:"",
    email:"",
    password:"",
  })


  function handelOncahnge(e){
    setFormData({...formData,[e.target.name] : e.target.value})
  }

  async function handelSubmit(e){
    e.preventDefault()
    console.log("Form submit ho raha hai");
    try {
       const res=await axios.post('http://localhost:3000/api/auth/creat-account' , formData,{
        withCredentials:true
      })
     setmessage(res.data?.message)
      
    } catch (err) {
      setmessage(err.response?.data?.message)
    }
    navigate("/")
   
  }
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input
        value={formData.userName}
         type="text"
         name="userName"
         placeholder="Enter USername"
         onChange={handelOncahnge}
        />
        <input
         value={formData.email}
         type="email" 
         name="email" 
         placeholder="Enter Email"
         onChange={handelOncahnge}
        />
        <input
         value={formData.password}
         type="password" 
         name="password" 
         placeholder="Enter Password"
         onChange={handelOncahnge} 
        />
        <button type="submit">Create Account</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateAccount;
