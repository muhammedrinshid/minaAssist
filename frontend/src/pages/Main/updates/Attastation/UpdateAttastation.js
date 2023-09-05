import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import AuthContext from '../../../../context/AuthContext';
import { errorOccured } from '../../../../utlties/Toastes';
import UpdateAttastationForm from './UpdateAttastationForm';

const UpdateAttastation = () => {
  const {getHeaders,getAgencies,agencies,logoutUser}=useContext(AuthContext)

  const [defaultContainer,setDefaultContainer]=useState([])
 
  
  const parms=useParams()
  useEffect(()=>{
    getAgencies()
    axios.get(`/api/get-attastation/${parms.id}/`,getHeaders).then((res)=>{
          console.log(res.data)
            setDefaultContainer(()=>res.data)
            
          
  
  
        }).catch((err)=>{
          if (err?.response.status==401) {
            logoutUser()
            
          }
          errorOccured()
        })

  },[])

  return  defaultContainer?<UpdateAttastationForm preLoadedValues={defaultContainer} agencies={agencies} defaultContainer={defaultContainer} />:<Loading/>
  
}

export default UpdateAttastation