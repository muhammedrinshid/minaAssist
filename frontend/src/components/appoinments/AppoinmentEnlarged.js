import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export const AppoinmentEnlarged = (props) => {
  const { tConvert } = useContext(AuthContext);
  const data = props.data;
  const setDeleteContent=props.setDeleteContent
  const setAnnexContent=props.setAnnexContent
  const setInvoiceContent=props.setInvoiceContent
  const deleteAppoinment=()=>{

    setDeleteContent((prev)=>{
      return {...prev,id:data?.id,visibility:true}
    })
  }
  const AnnexFormControler=()=>{

    setAnnexContent((prev)=>{
      return {...prev,defaultValues:data,visibility:true}
    })
  }
  const cancelEnlarger = () => {
    document.getElementById("enlarger__outer__layer3").style.display = "none";
  };
  const invoiceFormController=()=>{

    const details={
        gross__amount:data?.gross_amount,
        count:1,
        item:data?.appoinment_type+" appoinment",
        title:data?.applicant_name+" "+data?.appoinment_type+" appoinment",
        paid:data?.paid,
        name:data?.applicant_name,
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
    <div class="enlarger__outer__layer2" id="enlarger__outer__layer3">
      <div class="enlarger__container">
        <div class="enlarger__controler">
          <i
            class="fa-solid fa-rectangle-xmark"
            onClick={() => cancelEnlarger()}
          >
          </i>
        </div>
        <div class="enlarger__heading">
          <p>Booked Ticket/Track id -1404</p>
          <h1>{data?.applicant_name}</h1>
          <h5>C/O {data?.care_of}</h5>
        </div>
        <div class="enlarger__topbody">
          <div class="topbody__half">
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-calendar-check"></i>&nbsp; Submission Date
              </p>
              <p class="info__answer"> {data?.submission_date}</p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-regular fa-calendar-check"></i> &nbsp; Appoinment
                Date
              </p>
              <p class="info__answer"> {data?.appoinment_date} </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-clock"></i> &nbsp; Appoinment Time
              </p>
              <p class="info__answer"> {data?.appoinment_time&&tConvert(data?.appoinment_time)}</p>
            </div>
            <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-building-user"></i> &nbsp; Office
            </p>
            <p class="info__answer"> Malappuram </p>
          </div>
          <div class="topbody__info">
          <p class="nowrap">
            <i class="fa-solid fa-building-user"></i> &nbsp; Appoinment Type
          </p>
          <p class="info__answer"> {data?.appoinment_type} </p>
        </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-phone"></i> &nbsp; {data?.phone}
              </p>
              <p class="info__answer">
                {" "}
                <a href={"tel:"+data?.phone}>
                <button>
                  <i class="fa-solid fa-phone-volume"></i>
                  &nbsp;call
                  </button>
                </a>{" "}
              </p>
            </div>
          </div>
          <div class="topbody__half">
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-user"></i>&nbsp;Site Username
              </p>
              <p class="info__answer"> {data?.pass_seva_username} </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-sharp fa-solid fa-lock"></i> &nbsp; Site Password
              </p>
              <p class="info__answer"> {data?.pass_seva_password} </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-money-bill"></i> &nbsp;Net Amount
              </p>{" "}
              <p class="info__answer red2  ">
                <i class="fa-sharp fa-solid fa-indian-rupee-sign red2"></i>{" "}
                {data?.net_amount}{" "}
              </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-solid fa-money-bill"></i> &nbsp;Gross Amount
              </p>{" "}
              <p class="info__answer red  ">
                <i class="fa-sharp fa-solid fa-indian-rupee-sign red"></i>{" "}
                {data?.gross_amount}{" "}
              </p>
            </div>
            <div class="topbody__info">
              <p class="nowrap">
                <i class="fa-sharp fa-solid fa-credit-card"></i> &nbsp; Paid
              </p>
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
                <i class="fa-sharp fa-solid fa-indian-rupee-sign yellow"></i>{" "}
                {data?.gross_amount - data?.paid}{" "}
              </p>
            </div>
          
          </div>
        </div>
        <div class="enlarger__bottombody">
          <h3>ATTACHMENTS</h3>
          <p onClick={()=>invoiceFormController()}>
            {" "}
            <i class="fa-solid fa-paperclip"></i>&nbsp; Create Invoice
          </p>

          <p onClick={AnnexFormControler}>
            {" "}
            <i class="fa-sharp fa-solid fa-plus"></i> &nbsp; Annexure D and C
          </p>
          
          <div class="operators">
            <Link to={`/update-appoinment/${data?.id}`}>
              {" "}
              <i class="fa-regular fa-pen-to-square"></i> &nbsp; Edit
            </Link>
            <a onClick={deleteAppoinment}>
              {" "}
  
              <i class="fa-solid fa-trash" ></i> &nbsp; Delete
            </a>
          </div>
        </div>
        <div class="enlarger__notes">
          <h3>Notes</h3>
          <p>
          {data?.notes?data?.notes:"notes are null"}
          </p>
        </div>
      </div>
    </div>
  );
};
