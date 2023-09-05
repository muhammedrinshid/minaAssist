import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import CountrySelect from '../../../../components/CountrySelect';
import AuthContext from '../../../../context/AuthContext';
import { attastationSchema } from '../../../../utlties/Schemas';
import { errorOccured, updated } from '../../../../utlties/Toastes';

const UpdateAttastationForm = ({agencies,preLoadedValues,defaultContainer}) => {
    const navigate=useNavigate()
    const {getHeaders,logoutUser}=useContext(AuthContext)
    const methods = useForm({
        resolver:yupResolver(attastationSchema),
      });
     useEffect(()=>{
        methods.reset({...preLoadedValues,agency:preLoadedValues.agency?.id,
            country:preLoadedValues.country?.code,})
     },[defaultContainer])
      const { errors } = methods.formState;
      const onSubmit=(data)=>{
        data['title']=data['applicant_name']+" Attastation"
    data['transaction_date']=data['remitted_date']
        axios.put(`/api/get-attastation/${data.id}/`,data,getHeaders).then((res)=>{

          updated()
          navigate("/attastations")
          }).catch((err)=>{
            console.log(err )
            if (err.response.status==401){
                logoutUser()
            }
          })
    
      }

  return (
    <FormProvider {...methods}>
    <form className="registration__container" id="attastationForm" onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="registration__header">
        <h1>Certificate Attastation</h1>
        <p>Update Your Attastation</p>
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
                {...methods.register("applicant_name")}
              />
              <p className="error">{errors.applicant_name?.message}</p>


            </div>
          </div>
          <div className="reg__second">
          <div className="input__field">
          <p>Passport Number</p>
          <input
            type="text"
            placeholder="W987654"
            {...methods.register("pass_number")}
          />
          <p className="error">{errors.pass_number?.message}</p>

        </div>
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Remitted Date
              </p>
              <input
                type="date"
            

                {...methods.register("remitted_date")}
              />
              <p className="error">{errors.remitted_date?.message}</p>

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
              <p>
                <i className="fa-solid fa-star-of-life"></i> Contact number
              </p>
              <input
                type="text"
                placeholder="98765432110"
                {...methods.register("phone")}
              />
              <p className="error">{errors.phone?.message}</p>

            </div>
          </div>
          <div className="reg__second reg__third">
            <div className="input__field">
              <p>
                <i className="fa-solid fa-star-of-life"></i> Date of Birth
              </p>
              <input
                type="date"
                className="currentdate"
                id="from"
              
                
               
                {...methods.register("dob")}
              />
              <p className="error">{errors.dob?.message}</p>

            </div>
            <div className="input__field">
              <p>Agency</p>
              <select name="payment_status" {...methods.register("agency")}>
              {
                agencies?.map((agency)=>(
                  <option value={agency.id}>{agency.name+" "+agency.branch}</option>

                ))
              }
                
               
              </select>
              <p className="error">{errors.agency?.message}</p>


            
            </div><div className="input__field">
            <p>Certificate Type</p>

            <select
              id=""
              {...methods.register("certificate")}
            >
              <option value={undefined}  >Select a Country</option>
              <option value="Marriage" >Marriage</option>
              <option value="Under graduate"> UG</option>
              <option value="Post Graduate">PG</option>
              <option value="diploma">Diploma</option>
              <option value="school leaving">School leaving</option>
              <option value="tranfer">Tranfer</option>
              <option value="birth">Birth</option>
              <option value="other">other</option>
            </select>
          </div>
          </div>
        </div>
        <div className="registration__row">
          <div className="reg__second">
            <div className="input__field">
              <p>Country</p>
              <CountrySelect country={preLoadedValues?.country}/>
              <p className="error">{errors.country?.message}</p>



              
            </div>
            <div className="input__field">
              <p>Gross Amount</p>
              <input
                type="text"
                placeholder="5500"
                {...methods.register("gross_amount")
            }
              />
              <p className="error">{errors.gross_amount?.message}</p>

            </div>
           
          </div>
          <div className="reg__second ">
            
            <div className="input__field">
              <p>
                {" "}
                <i className="fa-sharp fa-solid  fa-indian-rupee-sign"></i>Net
                Amount
              </p>
              <input
                type="text"
                placeholder="500"
                {...methods.register("net_amount")}
              />
              <p className="error">{errors.net_amount?.message}</p>

              
            </div>
            <div className="input__field">
              <p>
                {" "}
                <i className="fa-sharp fa-solid  fa-indian-rupee-sign"></i> Paid
              </p>
              <input type="text" placeholder="5500"

              {...methods.register("paid")} />
              <p className="error">{errors.paid?.message}</p>

            </div>
          </div>
        </div>
        <div className="registration__row">
          <div className="reg__first notes">
            <div className="input__field">
              <p>Notes</p>
              <textarea  {...methods.register("notes")}></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="registration__footer">
        <div className="registration__confirm">
        
          <button className="goback" onClick={()=>{navigate("/attastations")}}>Go back</button>
          <button className="create" type="submit">
            Create{" "}
          </button>
        </div>
      </div>
    </form>
    </FormProvider>
  )
}

export default UpdateAttastationForm