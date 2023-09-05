import React,{useState} from "react";
import BroughtTicket from "../../../components/tikcetMarcket/BroughtTicket";
import SellTicket from "../../../components/tikcetMarcket/SellTicket";

const TicketMarket = () => {
  const[sell,setSell]=useState(false)
  return (
    <div>
      <div className="market__head">
        <div className={sell?"head__link active__head__link":"head__link"} onClick={()=>setSell(true)}>sell ticket</div>
        <div className={sell?"head__link ":"head__link active__head__link"} onClick={()=>setSell(false)}> brought ticket</div>
      </div>
      {sell?(<SellTicket/>):<BroughtTicket/>}
      
    </div>
  );
};

export default TicketMarket;
