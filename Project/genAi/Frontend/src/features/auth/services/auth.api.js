import axios from "axios";

const api=axios.create({
  baseURL:"http://localhost:3000",
  withCredentials:true
})

export async function register({ userName, password, email }) {
  try {
    const response = await api.post(
      "/api/auth/register-user",
      {
        userName,
        password,
        email,
      },
      
    );
    return response.data
  } catch (err) {
    console.log(err);
  }
}

export async function login({ userName, password }) {
  try {
    const response = await api.post(
      "/api/auth/login",
      {
        userName,
        password,
      },
    );
    return response.data
  } catch (err) {
    console.log(err);
  }
}

export async function logout(){
  try {
    const response=await api.get("/api/auth/logout")
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getMe(){
  try {
    const response= await api.get("/api/auth/get-me")
    return response.data
  } catch (error) {
    console.log(error)
  }
}