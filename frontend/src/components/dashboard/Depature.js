import React, { use, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { errorOccured } from "../../utlties/Toastes";

const Depature = (props) => {
  const { getHeaders, tConvert,logoutUser } = useContext(AuthContext);
  const data = props.data;
  const getDepatureData = () => {
    axios
      .get(`/api/depature/${data.id}/`, getHeaders)
      .then((res) => {
        props.setDepatureEnlarger(() => res.data);
        let block = document.getElementById("enlarger__outer__layer1");
        block.style.display = "block";
      }).catch((err)=>{
        if (err?.response.status==401) {
          logoutUser()
          
        }
        errorOccured()
      });

  };
  return (
    <div class="depature">
      <div class="name">
        <h5>{data?.pax_name}</h5>
      </div>
      <div class="careof">C/O {data.care_of}</div>
        <div class="call">
          <a href="tel:+">
            <i class="fa-solid fa-phone-volume"></i>
            &nbsp;{data.phone}
          </a>
        </div>
        <div class="airline">{data?.airline?.airline_name}</div>
        <div class="time">
          {" "}
          <i class="fa-solid fa-plane-departure"></i>{tConvert( data?.depature_time.substring(0,5)) } 
        </div>
        <div class="sector">{data?.depature_port.airport_code} to {data?.arrival_port.airport_code}</div>
        <div class="message">
          <i class="fa-solid fa-comment-sms"></i>
        </div>
        <div class="whatsapp">
          <i class="fa-brands fa-whatsapp"></i>
        </div>
        <div
          class="more"
          onClick={() => {
            getDepatureData();
          }}
        >
          More
        </div>
      </div>
      )
};

      export default Depature;
