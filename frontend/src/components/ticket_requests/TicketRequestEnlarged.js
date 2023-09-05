import React,{useContext} from 'react'
import { Link } from "react-router-dom";

import AuthContext from '../../context/AuthContext';

const TicketRequestEnlarged = (props) => {

  const { tConvert } = useContext(AuthContext);

  const cancelEnlarger = () => {
    document.getElementById("enlarger__outer__layer1").style.display = "none";
  };
  const setDeleteContent=props.setDeleteContent
  const data = props.ticketEnlarger;

  const deleteTicketRequest=()=>{

    setDeleteContent((prev)=>{
      return {...prev,id:data?.id,visibility:true}
    })
  }
  return (
    <div class="enlarger__outer__layer1" id="enlarger__outer__layer1">
    <div class="enlarger__container">
      <div class="enlarger__controler">
        <i class="fa-solid fa-rectangle-xmark" onClick={()=>cancelEnlarger()}></i>
      </div>
      <div class="enlarger__heading">
        <p>Requested Ticket/Track id -{data?.id.substring(0,10)}</p>
        <h1>{data?.applicant_name} x {data?.seats}</h1>
        <h5>{data?.care_of}</h5>
      </div>
      <div class="enlarger__topbody">
        <div class="topbody__half">
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-person"></i>&nbsp; Name of Requester
            </p>{" "}
            <p class="info__answer">{data?.applicant_name} </p>
          </div>
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-chair"></i>&nbsp; Required Seats
            </p>{" "}
            <p class="info__answer">{data?.seats} </p>
          </div>
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-calendar-check"></i>&nbsp; Willing from
            </p>{" "}
            <p class="info__answer">{data?.from_date?.substring(0, 10)} </p>
          </div>
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-regular fa-calendar-check"></i> &nbsp; Last 
              Date
            </p>{" "}
            <p class="info__answer">
              {" "}
              {data?.to_date?.substring(0, 10)}{" "}
            </p>
          </div>
   
         
       
        </div>
        <div class="topbody__half">
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-plane-departure"></i> &nbsp; From
            </p>{" "}
            <p class="info__answer">
              {" "}
              {data?.depature_port?.airport_place +
                " " +
                data?.depature_port?.airport_code}{" "}
            </p>
          </div>
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-plane-arrival"></i>&nbsp; To{" "}
            </p>{" "}
            <p class="info__answer">
              {" "}
              {data?.arrival_port?.airport_place +
                " " +
                data?.arrival_port?.airport_code}{" "}
            </p>
          </div>
     
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-sharp fa-solid fa-credit-card"></i> &nbsp; Pasport No:
            </p>{" "}
            <p class="info__answer ">
              {" "}
             
              {data?.pass_number}{" "}
            </p>
          </div>
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-phone"></i> &nbsp; {data?.phone}
            </p>{" "}
            <p class="info__answer">
              {" "}
              <a href={`tel:${data?.phone}`}>
              <button >
                {" "}
                <i class="fa-solid fa-phone-volume"></i> &nbsp;call
              </button>{" "}</a>
            </p>
          </div>
          <div class="topbody__info"></div>
        </div>
      </div>
      <div class="enlarger__bottombody">
        <h3>ATTACHMENTS</h3>
        <p>
          {" "}
          <i class="fa-solid fa-paperclip"></i>&nbsp; Document link
        </p>
        <p>
          {" "}
          <i class="fa-sharp fa-solid fa-plus"></i> &nbsp; Add attachments
        </p>
        <div class="operators">
          <Link to={`/update-ticket-request/${data?.id}`}>
            {" "}
            <i class="fa-regular fa-pen-to-square"></i> &nbsp; Edit
          </Link>
          <a onClick={deleteTicketRequest}>
            {" "}
            <i class="fa-solid fa-trash"></i> &nbsp; Delete
          </a>
        </div>
      </div>
      <div class="enlarger__notes">
        <h3>NOTES</h3>
        <p>
        {data?.notes?data?.notes:"notes are null"}

        </p>
      </div>
    </div>
  </div>  )
}

export default TicketRequestEnlarged