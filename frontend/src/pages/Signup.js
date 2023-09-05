import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import stamps from '../assets/stamps.png'
import {Link, useNavigate,Navigate} from 'react-router-dom'

import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import jwtDecode from "jwt-decode";
import { ExsistingMail } from '../utlties/Toastes';




const Signup = () => {

    
 

    const navigate = useNavigate();

    const {setAuthTocken,setUser,authTocken,user}=useContext(AuthContext)

    const schema=yup.object().shape({
        agency_name:yup.string().required("agency name is requierd field").min(4).max(30),
        branch:yup.string().required("branch is requierd field").min(4).max(30),
        email:yup.string().email().required("email is requierd field"),
        password:yup.string().required("password is requierd field").min(4).max(16),
        password2:yup.string().oneOf([yup.ref("password"),null],"password and confirm password must be same").required("confirm password is requierd field"),


    })

    const {handleSubmit,register,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    })
 

    const onSubmit=(data)=>{
        signupUser(data)

    }
    const signupUser=async(data)=>{

        axios.post("/api/create-user/",data).then((res)=>{
            if (res.status==201) {
                console.log(res.data)
                axios
                .post("/api/token/", {
                  email: data.email,
                  password: data.password,
                }).then((res) => {
                    if (res.status == 200) {
                        setAuthTocken(()=>res.data);
                        setUser(()=>jwtDecode(res.data?.access));
                      localStorage.setItem("authTokens",JSON.stringify(res.data))
            
                      navigate('/')
                    }
                  })  .catch((error) => {
                    if (error.response) {
                        navigate("/login")
                     
                    }
                  });
                
            }
        }).catch((err)=>{
            
            ExsistingMail()
           
        })


    }


  return (
    user?<Navigate to="/"/>:(
    
    <main className="signup__main">
        <div className="main__half">
            <div className="logo__container">
                <img src={logo} className="logo" alt=""></img>
                </div>
                <form className="form__area" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Create an Account</h1>
                    <div className="form__content">
                   
                        <label htmlFor=''>Agency </label>
                        <input type="text" name="" id="" placeholder="eg:mina travels" {...register("agency_name")}></input>
                    </div>
                    <p className='error'>{errors.agency_name?.message }</p>

                    

                    <div className="form__content">
                        <label htmlFor=''>Branch</label>
                        <input type="text" name="" id="" placeholder="Eg:valluvambram" {...register("branch")}></input>
                    </div>
                    <p className='error'>{errors.branch?.message }</p>

                    
                    <div className="form__content">
                        <label htmlFor=''>Email</label>
                        <input type="email" name="" id="" placeholder="examble@gmail.com" {...register("email")}></input>

                    </div>
                    <p className='error'>{errors.email?.message }</p>

                    <div className="form__content">
                        <label htmlFor=''>Password</label>
                        <input type="password" name="" id="" placeholder="enter atleast 8+ charaters" {...register("password")}></input>
                    </div>
                    <p className='error'>{errors.password?.message }</p>
                    <div className="form__content">
                        <label htmlFor=''>Password</label>
                        <input type="password" name="" id="" placeholder="confirm password" {...register("password2")}></input>
                    </div>
                    <p className='error'>{errors.password2?.message }</p>
                    
    
                    <button className="submit__button" type="submit">Sign up</button>
                    
                    <p className="nowrap">Already haven'n an accoutn?</p>
                <Link to="/login"  className="underlined_a" >Sign in</Link>
               
                </form>
        </div>
        <div className="main__half second__half">
            <div className="second__half__container">
                <img src={stamps}  alt=""></img>
                <h1>Create Your Free Account</h1>
                <p>Welcome to 'Mina-Assist',Your one-stop solution for all your travel agency needs.Our application is designed to provide seamless assistance to travel agents across india.With our innovative features,we ensure smooth application management,efficient transaction tracking,and hassle-free invoice generation. Trust 'Mina-Assist' to simplify Your agecny requirements
                </p>
                <br />
                <div className="social__icons nowrap primary">
                <a href="https:/www.linkedin.com/company/mina-assist" ><i className="fa-brands fa-linkedin"></i></a>
                <a href='tel:+918606544874' ><i className="fa-solid fa-phone"></i> </a>
                <a href='' ><i className="fa-brands fa-facebook"></i></a>
            </div>
            </div>
        </div>

    </main>
    )
    
  )
}

export default Signup