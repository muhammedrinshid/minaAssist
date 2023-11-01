import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Appoinment from "./Appoinment";
import Loading from ".././Loading";
import { useQuery } from "@tanstack/react-query";
import { wait } from "@testing-library/user-event/dist/utils";
import panda2 from "../../assets/padaaz2.png"
import { errorOccured } from "../../utlties/Toastes";

const Appoinments = (props) => {
  const { getHeaders,logoutUser,domain } = useContext(AuthContext);
  const [loading,setLoading]=useState(false)
  const [appoinments,setApoinments]=useState([])
  useEffect(()=>{
    setLoading(true)
    axios.get(
      `${domain}/api/get-appoinments?page=1&from=${props.from}&to=${props.from}&q=${props.q}&order=${true}`,
      getHeaders
    ).then((res)=>{
      setLoading(false)
      setApoinments(res.data.results)

    }).catch((err)=>{
      if (err?.response.status==401) {
        logoutUser()
        
      }
      errorOccured()
    })

  },[props.from,props.q])

 
         
    
      
    
      
  if (loading) {
    return(
      <Loading/>
    )
    
  }
  if (appoinments.length==0) {
    return(

      <div class="appoinments">
                        <div class="app__dep__header"><i class="fa-solid fa-calendar-check"></i> &nbsp; &nbsp;<h3>
                                APPOINMENTS</h3><span class="total">{appoinments.length}</span></div>

                        <div class="no_data_error">
                                <img src={panda2}/>
                                <h2>Empty Appoinments....!! </h2>

                            </div>



                    </div>
    )
    
  }

    return (
      <div class="appoinments">
        <div class="app__dep__header">
          <i class="fa-solid fa-calendar-check"></i> &nbsp; &nbsp;
          <h3>APPOINMENTS</h3>
          <span class="total">{appoinments.length}</span>
        </div>

        <div class="information__flex" style={{
          height:"40vh"
        }}>
          {appoinments?.map((appoinment) => {
            return (
              <Appoinment
                data={appoinment}
                setAppoinmentEnlarger={props.setAppoinmentEnlarger}
              />
            );
          })}
        </div>
      </div>
    );

};

export default Appoinments;
