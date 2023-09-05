import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const TicketEnlarged = (props) => {
  const setInvoiceContent=props.setInvoiceContent
    const cancelEnlarger = () => {
        document.getElementById("enlarger__outer__layer1").style.display = "none";
      };
  const data = props.ticketEnlarger;
  const { tConvert } = useContext(AuthContext);
  const setDeleteContent=props.setDeleteContent
  const deleteTicket=()=>{

    setDeleteContent((prev)=>{
      return {...prev,id:data?.id,visibility:true}
    })
  }
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
  return (
    <div class="enlarger__outer__layer1" id="enlarger__outer__layer1">
      <div class="enlarger__container">
        <div class="enlarger__controler">
          <i class="fa-solid fa-rectangle-xmark" onClick={()=>cancelEnlarger()}></i>
        </div>
        <div class="enlarger__heading">
          <p>Booked Appoinmet/Track id -1404</p>
          <h1>{data?.pax_name} x {data?.number_of_travelers}</h1>
          <h5>{data?.care_of}</h5>
        </div>
        <div class="enlarger__topbody">
          <div class="topbody__half">
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-calendar-check"></i>&nbsp; Number of Passanger
              </p>{" "}
              <p class="info__answer">{data?.number_of_travelers} </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-calendar-check"></i>&nbsp; Booked Date
              </p>{" "}
              <p class="info__answer">{data?.booked_on?.substring(0, 10)} </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-regular fa-calendar-check"></i> &nbsp; Depature
                Date
              </p>{" "}
              <p class="info__answer">
                {" "}
                {data?.depature_date?.substring(0, 10)}{" "}
              </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-clock"></i> &nbsp; Depature Time
              </p>{" "}
              <p class="info__answer">
                {" "}
                {data?.depature_time &&
                  tConvert(data?.depature_time.substring(0, 5))}{" "}
              </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-phone"></i> &nbsp; {data?.phone}
              </p>{" "}
              <p class="info__answer">
                {" "}
                <a href={`tel:${data?.phone}`}>
                <button>
                  {" "}
                  <i class="fa-solid fa-phone-volume"></i> &nbsp;call
                </button></a>
              </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-building-user"></i> &nbsp; Agency
              </p>{" "}
              <p class="info__answer">
                {" "}
                {data?.agency?.name + " " + data?.agency?.branch}{" "}
              </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-sharp fa-solid fa-plane"></i> &nbsp; Airline
              </p>{" "}
              <p class="info__answer"> {data?.airline?.airline_name} </p>
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
                <i class="fa-solid fa-money-bill"></i> &nbsp;Net Amount
              </p>{" "}
              <p class="info__answer red2  ">
                <i class="fa-sharp fa-solid fa-indian-rupee-sign red2"></i>{" "}
                {data?.net_amount}
              </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-money-bill"></i> &nbsp; Gross Amount
              </p>{" "}
              <p class="info__answer red  ">
                <i class="fa-sharp fa-solid fa-indian-rupee-sign red"></i>{" "}
                {data?.gross_amount}{" "}
              </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-sharp fa-solid fa-credit-card"></i> &nbsp; Paid
              </p>{" "}
              <p class="info__answer green">
                {" "}
                <i class="fa-sharp fa-solid fa-indian-rupee-sign green"></i>{" "}
                {data?.paid}{" "}
              </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-scale-unbalanced-flip"></i> &nbsp; Balance
              </p>{" "}
              <p class="info__answer yellow">
                {" "}
                <i class="fa-sharp fa-solid fa-indian-rupee-sign yellow"></i>{" "}
                {data?.gross_amount - data?.paid}{" "}
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
          <p onClick={()=>invoiceFormController()}>
            {" "}
            <i class="fa-sharp fa-solid fa-plus"></i> &nbsp; Create Invoice
          </p>
          <div class="operators">
            <Link to={`/update-ticket/${data?.id}`}>
              {" "}
              <i class="fa-regular fa-pen-to-square"></i> &nbsp; Edit
            </Link>
            <a onClick={deleteTicket}>
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
    </div>
  );
};

export default TicketEnlarged;
