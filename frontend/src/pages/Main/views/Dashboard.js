import React, { createContext, useContext, useEffect, useState } from "react";
import { AppoinmentEnlarged } from "../../../components/dashboard/AppoinmentEnlarged";
import Appoinments from "../../../components/dashboard/Appoinments";
import DepatureEnlarged from "../../../components/dashboard/DepatureEnlarged";
import Depatures from "../../../components/dashboard/Depatures";

const Dashboard = () => {
  const date = new Date();
  const [from ,setFrom]=useState(date.toISOString().substring(0, 10))
  const [q, setQ] = useState("");
  const [qholder,setQholder]=useState('')
  const [activeLink,setActiveLink]=useState(0)

  const setTomarrow=(n)=>{
    const newDate=new Date()
    setActiveLink(n)
    setQ('')
    newDate.setDate(newDate.getDate()+n)
    setFrom(newDate.toISOString().substring(0, 10))

  }
  

  

// state for save single fetched dapature and appoinment data
  const [depatureEnlarger,setDepatureEnlarger]=useState([])
  const [appoinmentEnlarger,setAppoinmentEnlarger]=useState([])
  const handlechange=(e)=>{
    e.preventDefault()
    setQholder(e.target.value)


  }
const handleSubmit=(e)=>{

  setQ(()=>qholder)

}

 

    return (
     
      <div className="sample">
        <div className="information__header">
          <div className="information__links">
            <div className={activeLink==0?"information__link active__information__link":"information__link"} onClick={()=>setTomarrow(0)}>Today</div>
            <div className={activeLink==1?"information__link active__information__link nowrap":"information__link nowrap"} onClick={()=>setTomarrow(1)}>Tomarrow</div>
            <div className={activeLink==2?"information__link active__information__link nowrap":"information__link nowrap"} onClick={()=>setTomarrow(2)}>Day after Tomarrow</div>
          </div>
  
          <div className="search__box">
            <input type="text" id="q"  defaultValue={''} placeholder="Search.." onChange={handlechange} ></input>

            <div className="icon" >

              <ion-icon name="search-circle-sharp" onClick={handleSubmit} >ser</ion-icon>
            </div>
          </div>
        </div>
        <div className="informations">
        <Depatures from={from} q={q} setDepatureEnlarger={setDepatureEnlarger}/>
        <Appoinments from={from} q={q} setAppoinmentEnlarger={setAppoinmentEnlarger} />
       

    </div>
    <AppoinmentEnlarged appoinmentEnlarger={appoinmentEnlarger}  />
    <DepatureEnlarged depatureEnlarger={depatureEnlarger} />
      </div>
      
    );
 


  
};

export default Dashboard;

