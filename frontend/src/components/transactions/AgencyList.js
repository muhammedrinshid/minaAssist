import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const AgencyList = (props) => {
    const {seeUsers,agencies,setAgencyId,setPageNumber,setQ,setFrom,setTo,setTransactions,setNext,setAgencyHeader}=props.contexts

   const navigate=useNavigate()

  return (
    <div class="agency__names" id="agencies">
        <i class="fa-sharp fa-solid fa-circle-xmark close__agency__view" onClick={()=>seeUsers(2)} ></i>

        {agencies?.map((agency)=>{
            return(
                <div onClick={()=>{

                    setPageNumber(1)
                    setAgencyHeader(agency.name+" "+agency.branch)
                    setFrom('')
                    setTo('')
                    setQ('')
                    setNext(null)
                    setTransactions([])
                    
                    setAgencyId(agency?.id)

                }
                
                } class="agency__name"> 
                <img src={`${agency?.image}`} onClick={()=>navigate("update-agency")} alt=""/>
                   <div class="agency__details">
                       <h4>{agency?.name}</h4>
                       <p>{agency?.branch}</p>
                   </div>
                
            </div>
            )


        })}


        
    
       

    </div>
  )
}

export default AgencyList