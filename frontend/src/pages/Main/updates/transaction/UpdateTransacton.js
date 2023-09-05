import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useContext, useState,useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../../context/AuthContext';
import { ticketShcema, transactionSchema } from '../../../../utlties/Schemas';
import { updated } from '../../../../utlties/Toastes';

const UpdateTransacton = () => {

    const navigate=useNavigate()
    const {getHeaders,logoutUser,agencies,getAgencies}=useContext(AuthContext)
    const methods = useForm({
      resolver: yupResolver(transactionSchema),
    });
    const { errors } = methods.formState;
    const  register=methods.register
  
  
    const [defaultContainer,setDefaultContainer]=useState({})
    const parms=useParams()
    useEffect(()=>{
      getAgencies()
      axios.get(`/api/transaction/${parms.id}/`,getHeaders).then((res)=>{
        setDefaultContainer(res.data)
  
      }).catch((err)=>{
        if (err.response.status==401) {
          logoutUser()
        }
      })
  
    },[])
    
    useEffect(()=>{
      methods.reset({...defaultContainer,agency:defaultContainer?.agency?.id})
  
    },[defaultContainer])   
    const onSubmit=(data)=>{
        console.log(data)
      
      axios.put(`/api/transaction/${parms.id}/`,data,getHeaders).then((res)=>{
      updated()
    //   navigate("/tickets")
      
      }).catch((err)=>{
        if (err?.response?.status==401) {
          logoutUser()
        }
      })
    }
  return (
    <form id="transactionForm" class="registration__container" onSubmit={methods.handleSubmit(onSubmit)}>
    <div class="registration__header">
      <h1>Transaction Registration</h1>
      <p>Update your Transaction</p>
    </div>
    <div class="registration__body">
      <div class="registration__row">
        <div class="reg__second">
          {defaultContainer?.debit_or_credit ? (
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> &nbsp;
                <i class="fa-sharp fa-solid  fa-indian-rupee-sign"></i> Amount
              </p>
              <input type="text" placeholder="Amount" {...register("net_amount")}/>
              <p className="error">{errors.net_amount?.message}</p>

            </div>
          ) : (
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> &nbsp;
                <i class="fa-sharp fa-solid  fa-indian-rupee-sign"></i>Net
                Amount
              </p>
              <input type="text" placeholder="Amount"  {...register("net_amount")}/>
              <p className="error">{errors.net_amount?.message}</p>

            </div>
          )}
          <div class="input__field">
            <p>
              <i class="fa-solid fa-star-of-life"></i>Title
            </p>
            <input type="text" {...register("title")}/>
            <p className="error">{errors.title?.message}</p>

          </div>
        </div>

        <div class="reg_first">
          <div class="input__field">
            <p>
              <i class="fa-solid fa-star-of-life"></i>
              Agency
            </p>
            <select id="" {...register("agency")}>
              {agencies?.map((agency) => (
                <option value={agency.id}>
                  {agency.name + " " + agency.branch}
                </option>
              ))}
            </select>
            <p className="error">{errors.agency?.message}</p>

          </div>
        </div>
      </div>
      <div class="registration__row">
        <div class="reg__second">
          <div class="input__field">
            <p>Deposited Through</p>

            <select name="payment_status" id="" {...register("transaction_method")}>
              <option value="Bank deposit">Bank Deposit</option>
              <option value="Face to face"> Face to face</option>
              <option value="Upi">UPI</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Check">Check</option>
              <option value="Tranfer">Transfer</option>
            </select>
            <p className="error">{errors.transaction_method?.message}</p>

            
          </div>
          <div class="input__field">
            <p>
              <i class="fa-solid fa-star-of-life"></i> ID or Bill no
            </p>
            <input type="text" placeholder="Ckd33" {...register("bill_no")} />
            <p className="error">{errors.bill_no?.message}</p>

          </div>
        </div>
        <div class="reg__second reg__third">
        <div class="input__field">
            <p>
              <i class="fa-solid fa-star-of-life"></i> Date
            </p>
            <input
                type="date"
                defaultValue={new Date().toISOString().substring(0, 10)}
                {...register("transaction_date")}
              />
            <p className="error">{errors.transaction_date?.message}</p>

          </div>

          {!defaultContainer?.debit_or_credit && (
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> &nbsp;
                <i class="fa-sharp fa-solid  fa-indian-rupee-sign"></i>Gross
                Amount
              </p>
              <input type="text" placeholder="Gross Amount" {...register("gross_amount")} defaultValue={0} />
              <p className="error">{errors.gross_amount?.message}</p>

            </div>
          )}
         
          
        

        </div>
      </div>

      <div class="registration__row">
        <div class="reg__first notes">
          <div class="input__field">
            <p>
              <i class="fa-solid fa-star-of-life"></i> Notes
            </p>
            <textarea {...register("notes")}></textarea>
          </div>
        </div>
     
      </div>
    </div>
    <div class="registration__footer">
      <div class="registration__confirm">
        <button class="goback" type='button'  onClick={()=>navigate(-1)} >Go back</button>
        <button class="create" type="submit">Create </button>
      </div>
    </div>
  </form>
  )
}

export default UpdateTransacton