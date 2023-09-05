import axios from 'axios'
import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { errorOccured } from '../../utlties/Toastes'

const TicketRequest = (props) => {
  const {getHeaders,logoutUser}=useContext(AuthContext)
  const data=props.data
  const setTicketEnlarger=props.setTicketEnlarger
  const setDeleteContent=props.setDeleteContent


  const deleteTicketRequest=()=>{

    setDeleteContent((prev)=>{
      return {...prev,id:data?.id,visibility:true}
    })
  }
  const getTicketData=()=>{
      axios
    .get(`/api/ticket-request/${data.id}/`, getHeaders)
    .then((res) => {
      setTicketEnlarger(() => res.data);
      let block = document.getElementById("enlarger__outer__layer1");
      block.style.display = "block";
    }).catch((err)=>{
      if (err?.response.status==401) {
        logoutUser()
        
      }
      errorOccured()
    });
  }
  return (
    <div class="depature">
                <div class="name">
                    <h5>{data?.applicant_name } </h5>
                </div>
                <div class="careof">
                  {data?.pass_number}
                </div>
                <div class="call"><a href="tel:+"><i class="fa-solid fa-phone-volume"></i>
                        &nbsp;{data?.phone}</a></div>
                <div class="airline">seats x {data?.seats.substring(0,15)} </div>
                <div class="booked">
                    <p class="nowrap"> <i class="fa-solid fa-plane-departure"></i>{data?.from_date}</p>
                    <p>{data?.depature_port?.airport_code} to {data?.arrival_port?.airport_code}</p>
                    <p class="nowrap"><i class="fa-solid fa-plane-lock"></i>{data?.to_date}</p>
                    
                </div>
                <div class="message"><i class="fa-solid fa-comment-sms"></i></div>
                <div class="invoice"><i class="fa-sharp fa-solid fa-file-invoice"></i></div>
                <div class="more" onClick={()=>getTicketData()}>More</div>

                <div class="depature__edit"><i class="fa-solid fa-pen-to-square"></i></div>
                <div class="depature__delete"><i class="fa-solid fa-trash" onClick={deleteTicketRequest}></i></div>


            </div>
  )
}

export default TicketRequest