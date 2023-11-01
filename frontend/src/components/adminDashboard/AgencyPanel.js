import React, { useContext } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  avart1  from "../../assets/user.jpg";
import  avart2  from "../../assets/user.jpg";
import  avart3  from "../../assets/user.jpg";
import  avart4  from "../../assets/user.jpg";
import  avart5  from "../../assets/user.jpg";
import user from '../../assets/user.jpg';
import AuthContext from '../../context/AuthContext';

const AgencyPanel = (props) => {
  const {domain}=useContext(AuthContext)



  return (
    <div className="agency__names" id='agencyList'>

    <i className="fa-sharp fa-solid fa-circle-xmark close__agency__view" onClick={() => {
      document.getElementById("agencyList").style.display = "none"



    }}></i>
    {
      props.agencyPayments?.map((agency)=>(
        <div className="agency__name">
        <img src={domain+agency.img} alt="" />
        <div className="agency__details">
          <h4>{agency.name}</h4>
          <p>{agency.branch}</p>
        </div>
        <div className={agency?.balance>=0?"debth__amount green":"debth__amount red"}><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp; {agency.balance} {agency?.balance>=0?(<ion-icon name="chevron-up-outline"></ion-icon>):(<ion-icon name="chevron-down-outline"></ion-icon>)}</div>
  
      </div>
      ))
    }
   

  

  </div>
  )
}

export default AgencyPanel