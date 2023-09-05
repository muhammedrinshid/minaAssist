import axios from "axios";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { errorOccured } from "../../utlties/Toastes";

const Appoinment = (props) => {
    const  data=props.data
    const {tConvert,getHeaders,logoutUser}=useContext(AuthContext)
    const setAppoinmentEnlarger = props.setAppoinmentEnlarger


    const getAppoinmentData=()=>{
        axios.get(`/api/appoinment/${data.id}/`,getHeaders).then((res)=>{
            setAppoinmentEnlarger(()=>res.data)
            let block=document.getElementById("enlarger__outer__layer2")
             block.style.display='block'


        }).catch((err)=>{
          if (err?.response.status==401) {
            logoutUser()
            
          }
          errorOccured()
        })
        
    }
  return (
    <div class="depature">
          <div class="name">
            <h5>{data?.applicant_name} </h5>
          </div>
          <div class="careof">C/O {data?.care_of}</div>
          <div class="call">
            <a href="tel:+">
              <i class="fa-solid fa-phone-volume"></i>
              &nbsp;{data?.phone}
            </a>
          </div>
          
          {data?.paid==0?(<div class="payment notpaid">not paid</div>)
          :data?.paid==data.gross_amount?(<div class="payment paid">paid</div>):(<div class="payment advanced">advanced</div>)}
          
          <div class="time">
           
            <i class="fa-solid fa-calendar-check"></i>{tConvert(data?.appoinment_time.substring(0,6))}
          </div>
          <div class="message">
            <i class="fa-solid fa-comment-sms"></i>
          </div>
          <div class="whatsapp">
            <i class="fa-brands fa-whatsapp"></i>
          </div>
          <div class="more" onClick={()=>getAppoinmentData()}>More</div>
        </div>
  )
}

export default Appoinment