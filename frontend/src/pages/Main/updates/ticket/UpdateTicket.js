import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AirlineSelect from '../../../../components/AirlineSelect';
import AirportSelect from '../../../../components/AirportSelect';
import AuthContext from '../../../../context/AuthContext';
import { ticketShcema } from '../../../../utlties/Schemas';
import { updated } from '../../../../utlties/Toastes';
const UpdateTicket = () => {

    const navigate=useNavigate()
    const {getHeaders,logoutUser,agencies,getAgencies}=useContext(AuthContext)
    const methods = useForm({
      resolver: yupResolver(ticketShcema),
    });
    const { errors } = methods.formState;
  
  
    const [defaultContainer,setDefaultContainer]=useState({})
    const parms=useParams()
    useEffect(()=>{
      getAgencies()
      axios.get(`/api/depature/${parms.id}/`,getHeaders).then((res)=>{
        setDefaultContainer(res.data)
  
      }).catch((err)=>{
        if (err.response.status==401) {
          logoutUser()
        }
      })
  
    },[])
    
    useEffect(()=>{
      methods.reset({...defaultContainer,agency:defaultContainer?.agency?.id,depature_port:defaultContainer?.depature_port?.id,
        arrival_port:defaultContainer?.arrival_port?.id,airline:defaultContainer?.airline?.id})
  
    },[defaultContainer])   
    const onSubmit=(data)=>{
        console.log(data)
        data['debit_or_credit']=false
        data['title']=data['pax_name']+'x'+data['number_of_travelers']+' ticket'
        data['transaction_date']=data['booked_on']
      axios.put(`/api/depature/${parms.id}/`,data,getHeaders).then((res)=>{
      updated()
      navigate("/tickets")
      
      }).catch((err)=>{
        if (err?.response?.status==401) {
          logoutUser()
        }
      })
    }
  return (
    <FormProvider {...methods}>
    <form
    id="ticket-form"
      className="registration__container"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <div className="registration__header">
        <h1>Ticket Form</h1>
        <p>Add New Ticket</p>
      </div>
      <div className="registration__body">
        <div className="registration__row">
          <div className="reg_first">
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Name
              </p>
              <input
                type="text"
                placeholder="Applicant name"
                {...methods.register("pax_name")}
              />
              <p className="error">{errors.pax_name?.message}</p>
            </div>
          </div>
          <div className="reg__second reg__third">
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Pax Number
              </p>
              <input
                type="number"
                max={9}
                min={1}
                placeholder="number of passenger"
                {...methods.register("number_of_travelers")}
                defaultValue={1}
              />
              <p className="error">{errors.number_of_travelers?.message}</p>
            </div>
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Airline Pnr
              </p>
              <input type="text" {...methods.register("pnr")} />
              <p className="error">{errors.pnr?.message}</p>
            </div>
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Booked On
              </p>
              <input
                type="date"
                className="currentdate"
                id="from"
                defaultValue={new Date().toISOString().substring(0, 10)}
                {...methods.register("booked_on")}
              />
              <p className="error">{errors.booked_on?.message}</p>
            </div>
          </div>
        </div>
        <div className="registration__row">
          <div className="reg__second">
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Care of
              </p>
              <input
                type="text"
                placeholder="Applicant Care of"
                {...methods.register("care_of")}
              />
              <p className="error">{errors.care_of?.message}</p>
            </div>
            <div className="input__field">
              <p>Agency</p>
              <select
                name="payment_status"
                id=""
                {...methods.register("agency")}
              >
                {agencies?.map((agency) => (
                  <option value={agency.id}>
                    {agency.name + " " + agency.branch}
                  </option>
                ))}
              </select>
              <p className="error">{errors.agency?.message}</p>
            </div>
          </div>
          <div className="reg__second reg__third">
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
                <i className="fa-solid fa-star-of-life"></i> Depature Date
              </p>
              <input type="date" {...methods.register("depature_date")} />
              <p className="error">{errors.depature_date?.message}</p>
            </div>
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Depature Time
              </p>
              <input
                type="time"
                className="time"
                {...methods.register("depature_time")}
              />
              <p className="error">{errors.de?.message}</p>
            </div>
          </div>
        </div>
        <div className="registration__row">
          <div className="reg__second reg__third">
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
            <div className="input__field">
              <p>Airlines</p>
              <AirlineSelect />
              <p className="error">{errors.airline?.message}</p>
            </div>
          </div>
          <div className="reg__second reg__third">
            <div className="input__field">
              <p>Gross Amount</p>
              <input
                type="text"
                placeholder="20000"
                {...methods.register("gross_amount")}
              />
              <p className="error">{errors.gross_amount?.message}</p>
            </div>
            <div className="input__field" id="amount">
              <p>Net Amount</p>

              <input
                type="text"
                placeholder="19500"
                id=""
                {...methods.register("net_amount")}
              />
              <p className="error">{errors.net_amount?.message}</p>
            </div>
            <div className="input__field" id="amount">
              <p>Paid</p>

              <input
                type="text"
                name=""
                placeholder="20000"
                id=""
                {...methods.register("paid")}
              />
              <p className="error">{errors.paid?.message}</p>
            </div>
          </div>
        </div>
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
          <button  className="goback" onClick={()=>navigate(-1)} type='button'  >Go back</button>
          <button className="create" type="submit">
            Update{" "}
          </button>
        </div>
      </div>
    </form>
  </FormProvider>
  )
}

export default UpdateTicket