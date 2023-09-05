import axios from 'axios'
import React, { useContext } from 'react'
import { useController } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import { errorOccured } from '../../utlties/Toastes';

const SingleTicket = (props) => {
  const navigate=useNavigate()
  const setInvoiceContent=props.setInvoiceContent
    const data=props.data
    const setTicketEnlarger=props.setTicketEnlarger
    const {getHeaders,logoutUser}=useContext(AuthContext)
    const setDeleteContent=props.setDeleteContent
    const invoiceFormController=()=>{
      let temp=parseInt(data?.gross_amount)/parseInt(data?.number_of_travelers)

      const details={
        gross__amount:temp,
        item:"Ticket",
        count:data?.number_of_travelers,
        title:data?.depature_port?.airport_code+' to '+data?.arrival_port?.airport_code+" on "+data?.depature_date,
        paid:data?.paid,
        name:data?.pax_name,
        care_of:data?.care_of,
        id:data?.id
  
      }
      setInvoiceContent(prev=>{ 
          return {
              ...prev,
              details:details,
              visibility:true
          }
      })
    }
    const deleteTicket=()=>{

      setDeleteContent((prev)=>{
        return {...prev,id:data?.id,visibility:true}
      })
    }
    const getTicketData=()=>{
        axios
      .get(`/api/depature/${data.id}/`, getHeaders)
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
                    <h5>{data?.pax_name} </h5>
                </div>
                <div class="careof">
                    C/O {data?.care_of}
                </div>
                <div class="call"><a href={`tel:${data.phone}`}><i class="fa-solid fa-phone-volume"></i>
                        &nbsp;{data?.phone}</a></div>
                <div class="airline">{data?.airline?.airline_name} </div>
                <div class="booked">
                    <p class="nowrap"> <i class="fa-solid fa-plane-departure"></i>{data?.depature_date}</p>
                    <p>{data?.depature_port?.airport_code} to {data?.arrival_port?.airport_code}</p>
                    <p class="nowrap"><i class="fa-solid fa-plane-lock"></i>{data?.booked_on}</p>
                    
                </div>
                <div class="message"><i class="fa-solid fa-comment-sms"></i></div>
                <div class="invoice"><i class="fa-sharp fa-solid fa-file-invoice" onClick={()=>invoiceFormController()}></i></div>
                <div class="more" onClick={()=>getTicketData()}>More</div>

                <div class="depature__edit"><i class="fa-solid fa-pen-to-square" onClick={()=>navigate(`/update-ticket/${data?.id}`)}></i></div>
                <div class="depature__delete"><i class="fa-solid fa-trash" onClick={deleteTicket}></i></div>


            </div>
  )
}

export default SingleTicket