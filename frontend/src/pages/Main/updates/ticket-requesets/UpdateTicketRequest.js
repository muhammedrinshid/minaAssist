import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React,{useEffect,useState,useContext} from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import AirportSelect from '../../../../components/AirportSelect';
import AuthContext from '../../../../context/AuthContext';
import { tickerRequestSchema } from '../../../../utlties/Schemas';
import { updated } from '../../../../utlties/Toastes';

const UpdateTicketRequest = () => {
    const navigate=useNavigate()


    const {logoutUser,getHeaders}=useContext(AuthContext)
    const [defaultContainer,setDefaultContainer]=useState({})

    const methods = useForm({
        resolver:yupResolver(tickerRequestSchema)
      });
      const {errors}=methods.formState
      const parms=useParams()

      useEffect(()=>{
        axios.get(`/api/ticket-request/${parms.id}/`,getHeaders).then((res)=>{
          setDefaultContainer(res.data)
    
        }).catch((err)=>{
          if (err.response.status==401) {
            logoutUser()
          }
        })
    
      },[])
      
      useEffect(()=>{
        methods.reset({...defaultContainer,depature_port:defaultContainer?.depature_port?.id,
          arrival_port:defaultContainer?.arrival_port?.id})
    
      },[defaultContainer])   
      const onSubmit=(data)=>{
          console.log(data)
         
        axios.put(`/api/ticket-request/${parms.id}/`,data,getHeaders).then((res)=>{
        updated()
        navigate("/ticket-requests")
        
        }).catch((err)=>{
          if (err?.response?.status==401) {
            logoutUser()
          }
        })
      }
   return (
    <FormProvider {...methods}>
    <form id="ticketRequesform" className="registration__container" onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="registration__header">
        <h1>Ticket Request</h1>
        <p>Add New Ticket Request</p>
      </div>
      <div className="registration__body">
        <div className="registration__row">
          <div className="reg_first">
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Name of Passanger
              </p>
              <input
                type="text"
                placeholder="passanger name"
                {...methods.register("applicant_name")}
              />
              <p className="error">{errors.applicant_name?.message}</p>
              


            </div>
          </div>
          <div className="reg__second ">
            <div className="input__field">
              <p>From</p>
              <AirportSelect registerName={{ Name: "depature_port" }} />
              <p className="error">{errors.depature_port?.message}</p>

            </div>
            <div className="input__field">
              <p>To</p>
              <AirportSelect registerName={{ Name: "arrival_port" }} />
              <p className="error">{errors.arrival_port?.message}</p>

            </div>
          </div>
        </div>
        <div className="registration__row">
          <div className="reg__second reg__third">
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> From Date
              </p>
              <input type="date" {...methods.register("from_date", {
                valueAsDate: true,
              })} />
              <p className="error">{errors.from_date?.message}</p>

            </div>
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> To Date
              </p>
              <input type="date" {...methods.register("to_date", {
                valueAsDate: true,
              })} />
              <p className="error">{errors.to_date?.message}</p>

            </div>
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Required Seats
              </p>
              <input type="number" placeholder="3" defaultValue={1} min={1} max={9} {...methods.register("seats")} />
              <p className="error">{errors.seats?.message}</p>

            </div>
            
          </div>
          <div className="reg__second">
          <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Contact Number
              </p>
              <input
                type="text"
                placeholder="9876543210"
                {...methods.register("phone")}
              />
              <p className="error">{errors.phone?.message}</p>

            </div>
            
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Pass Number
              </p>
              <input
                type="text"
                placeholder="W9876543"
                {...methods.register("pass_number")}
              />
              <p className="error">{errors.pass_number?.message}</p>

            </div>
          </div>
        </div>
        <div className="registration__row"></div>
        <div className="registration__row">
          <div className="reg__first notes">
            <div className="input__field">
              <p>Notes</p>
              <textarea {...methods.register("notes")}></textarea>

            </div>
          </div>
          <div className="reg__second"></div>
        </div>
      </div>
      <div className="registration__footer">
        <div className="registration__confirm">
          <button className="goback" type="button" onClick={()=>navigate(-1)}>Go Back</button>
          <button className="create" type="submit">
            Create{" "}
          </button>
        </div>
      </div>
    </form>
    </FormProvider> 
  );
  
}

export default UpdateTicketRequest