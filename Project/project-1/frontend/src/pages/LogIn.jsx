import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
  const navigate= useNavigate()
  const [message, setMessage] = useState("")
  const [form, setform] = useState({
    userName:"",
    password:""
  })

  function handelChange(e){
     setform({...form,[e.target.name] : e.target.value})
  }

  async function handelsubmit(e){
    e.preventDefault()
    console.log("login ho rha hai ")
    try {
      const res=await axios.post("http://localhost:3000/api/auth/login",form,{
        withCredentials:true
      })
      setMessage(res.data?.message)
    } catch (error) {
      setMessage(error.response?.data?.message)
    }
    navigate("/CreatePost")
  }

  return (

    <div>
      <form onSubmit={handelsubmit}>
        <input
         value={form.userName}
         onChange={handelChange}
         name='userName'
         type="text"
         placeholder='Enter Your userName or email'
        />
        <input
         value={form.password}
         onChange={handelChange}
         name='password' 
         type="password"
         placeholder='Enter Password'
        />
        <button type='submit'> Login </button>
        
      </form>
      <button onClick={()=>{navigate("/CreateAccount")}}>don't have account creat account</button>
      <p>{message}</p>
    </div>
  )
}

export default LogIn