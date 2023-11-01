import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import signin from '../assets/signin.png'
import {Link, useNavigate,Navigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from "axios";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';

import { wrongPassword } from '../utlties/Toastes'



const Login = () => {



    const navigate = useNavigate();

    
    
    const {setUser,setAuthTocken,authTocken,user,domain}=useContext(AuthContext)
    const [loginError,setLoginError]=useState(null)

    let loginUser = async (e) => {
        e.preventDefault();
    
        axios
          .post(`${domain}/api/token/`, {
            email: e.target.usermail.value,
            password: e.target.userpassword.value,
          })
          .then((res) => {
            if (res.status == 200) {

              setAuthTocken(()=>res.data);
              setUser(()=>jwtDecode(res.data?.access));
              localStorage.setItem("authTokens",JSON.stringify(res.data))
    
              navigate("/ ");
            }
          })
          .catch((error) => {
            if (error.response) {
              wrongPassword()
                setLoginError("the enterd password or username is incorrect")

             
            }
          });
      };

  return (
    
    user?<Navigate to="/"/>:(
      
    <main className="signin__main">
    <div className="main__half">
        <div className="logo__container">
        <img src={logo} className="logo" alt=""></img>
        </div>
        <div className="form__area">
            <h1>Sign In</h1>
            <form onSubmit={(e)=>{
              loginUser(e)
            }} method="POST">
                <div className="form__content">
                    <label htmlFor=''>Email</label>
                    <input type="email" name="usermail" placeholder="examble@gmail.com"></input>
                </div>
                <div className="form__content">
                    <label htmlFor=''>Password</label>
                    <input type="password" name="userpassword"  placeholder="enter atleast 8+ charaters"></input>
                </div>
                <div className="form__buttons">
                   <div className="rememberme"> <input className="Signin__checkbox" type="checkbox" name=" af" id="remember_me" ></input><label for="remember_me">Remember me</label></div>
                    <a >Forgot password?</a>
                </div>
                <p className='error'>{loginError} </p>

                <input type="submit" className='submit__button' value="submit" />

                
            </form>
            <p className="nowrap">Don't have an account?</p>
            <Link to="/signup" className="underlined_a" >Sign up</Link>
        </div>


    </div>
    <div className="main__half second__half">
        <div className="secon__half__container">
        <img src={signin}  alt=""></img>
        <h1>Welcome Back</h1>
        <p>Easy Acces | Fast Retrieve</p>
    </div>
    </div>
</main>)
  )
}

export default Login