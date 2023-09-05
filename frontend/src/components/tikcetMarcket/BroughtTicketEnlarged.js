import React,{useContext} from 'react'
import AuthContext from '../../context/AuthContext';

const BroughtTicketEnlarged = (props) => {
    const {tConvert}=useContext(AuthContext)
    const cancelEnlarger = () => {
        document.getElementById("enlarger__outer__layer1").style.display = "none";
      };
  const data = props.data;
  return (
    <div class="enlarger__outer__layer1" id="enlarger__outer__layer1">
    <div class="enlarger__container">
      <div class="enlarger__controler">
        <i class="fa-solid fa-rectangle-xmark" onClick={()=>cancelEnlarger()}></i>
      </div>
      <div class="enlarger__heading">
        <p>{data?.airline?.airline_name}{" "}/{" "}{data?.flight_number}</p>
        <h1>{data?.depature_port?.airport_code +
            " To " +
            data?.arrival_port?.airport_code}{" "}</h1>
        <h5>{data?.owner?.agency_name} {" "}{data?.owner?.branch}</h5>
      </div>
      <div class="enlarger__topbody">
        <div class="topbody__half">
        <div class="topbody__info">
        <p class="nowrap">
          <i class="fa-solid fa-plane-departure"></i> &nbsp; Origin
        </p>{" "}
        <p class="info__answer">
          {" "}
          {data?.depature_port?.airport_place }
        </p>
      </div>
      <div class="topbody__info">
        <p class="nowrap">
          <i class="fa-solid fa-plane-arrival"></i>&nbsp; Destination{" "}
        </p>{" "}
        <p class="info__answer">
          {" "}
          {data?.arrival_port?.airport_place }
        </p>
      </div>
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-regular fa-calendar-check"></i> &nbsp; Depature
              Date
            </p>{" "}
            <p class="info__answer">
              {" "}
              {data?.date?.substring(0, 10)}{" "}
            </p>
          </div>
         
        
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-clock"></i> &nbsp; Depature Time
            </p>{" "}
            <p class="info__answer">
              {" "} {data?.depature_time &&
                tConvert(data?.depature_time.substring(0, 5))}{" "}
             
            </p>
          </div>
          <div class="topbody__info">
          <p class="nowrap">
            <i class="fa-solid fa-clock"></i> &nbsp; Arrival Time
          </p>{" "}
          <p class="info__answer">
            {" "} {data?.arrival_time &&
              tConvert(data?.arrival_time.substring(0, 5))}{" "}
           
          </p>
        </div>
        
       
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-sharp fa-solid fa-plane"></i> &nbsp; Airline
            </p>{" "}
            <p class="info__answer"> {data?.airline?.airline_name} </p>
          </div>
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-suitcase"></i> &nbsp; Cabin Baggage
            </p>
            <p class="info__answer"> {data?.cabin_baggage}{" "}Kg </p>
          </div>
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-suitcase-rolling" ></i> &nbsp; Checkin Baggage
            </p>{" "}
            <p class="info__answer"> {data?.checkin_baggage}{" "}Kg </p>
          </div>
        </div>
        <div class="topbody__half">
        <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-chair"></i>&nbsp; Number of Seats
            </p>{" "}
            <p class="info__answer">{data?.seats} </p>
          </div>
        <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-stop"></i>&nbsp; Number of Stops
            </p>{" "}
            <p class="info__answer">{data?.stops} </p>
          </div>
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-calendar-check"></i>&nbsp; Published Date
            </p>{" "}
            <p class="info__answer">{data?.created_on?.substring(0, 10)} </p>
          </div>
         
          <div class="topbody__info">
            <p class="nowrap">
              <i class="fa-solid fa-money-bill"></i> &nbsp;Amount
            </p>{" "}
            <p class="info__answer red2  ">
              <i class="fa-sharp fa-solid fa-indian-rupee-sign red2"></i>{" "}
              {data?.amount}
            </p>
          </div>
          <div class="topbody__info">
          <p class="nowrap">
            <i class="fa-solid fa-phone"></i> &nbsp; {data?.phone}
          </p>{" "}
          <p class="info__answer">
            {" "}
            <button>
              {" "}
              <i class="fa-solid fa-phone-volume"></i> &nbsp;call
            </button>{" "}
          </p>
        </div>
        <div class="topbody__info">
        <p class="nowrap">
          <i class="fa-solid fa-email"></i> &nbsp; {data?.mail}
        </p>{" "}
        <p class="info__answer">
          {" "}
          <a href={`mailto: ${data?.mail}`}>
          <button>
            {" "}
            <i class="fa-solid fa-letter"></i> &nbsp;Mail
          </button>
          </a>{" "}
        </p>
      </div>
          
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
  )
}

export default BroughtTicketEnlarged