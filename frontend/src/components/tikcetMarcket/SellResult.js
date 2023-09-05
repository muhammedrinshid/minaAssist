import axios from 'axios'
import React,{useContext,useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { errorOccured } from '../../utlties/Toastes'

const SellResult = (props) => {

    const data=props.data
    const [seats,setSeats]=useState(data?.seats?data?.seats:0)
    const {getHeaders,logoutUser}=useContext(AuthContext)
    const setDeleteContent=props.setDeleteContent


  const deleteTickeOnSale=()=>{

    setDeleteContent((prev)=>{
      return {...prev,id:data?.id,visibility:true}
    })
  }
    

    const updateSeats=(type)=>{
        const temp={}
        temp["seats"]=data?.seats
        if(type){
            temp["seats"]=parseInt(seats)+1

        }else{
            temp["seats"]=parseInt(seats)-1
        }
        axios.put(`/api/alter-seats/${data?.id}/`,temp,getHeaders).then((res)=>{
            if (res.status==202) {
                setSeats(res.data)
               console.log(res.data)
                
            }
        }).catch((err)=>{
            if (err?.response.status==401) {
              logoutUser()
              
            }
            errorOccured()
          })
    }
  return (
    <div class="flight__result">
            <div class="flight__admin__controler">



                <div fligh__admin__flex> <div class="seat__controle red" onClick={()=>updateSeats(false)} ><i class="fa-solid fa-minus"></i></div></div>
                <div fligh__admin__flex><div class="seat__count">{seats}</div></div>
                <div fligh__admin__flex><div class="seat__controle green" onClick={()=>updateSeats(true)}><i class="fa-solid fa-plus"></i></div></div>

                
                



            </div>
            <div class="flight__sector">
                <div class="airport">
                    <p>Calicut  </p>
                    <h1>{data?.depature_port?.airport_code}</h1>
                    <h5>10:00</h5>
                </div>
                <div class="arrow__container">
                    <p class="arrow">&#8646;</p>
                    <p class="stop">1 stop</p>
                    
                </div>
                <div class="airport">
                    <p>Jeddah  </p>
                    <h1>{data?.arrival_port?.airport_code}</h1>
                    <h5>18:00</h5>
                </div>
            </div>
            <div class="flight__services">
                <p><i class="fa-solid fa-suitcase"></i> &nbsp;  7 kg hand baggage</p>
                <p><i class="fa-solid fa-suitcase-rolling"></i>&nbsp;  25 kg checkIn baggage</p>
                <p><i class="fa-solid fa-utensils"></i>&nbsp;  7 kg hand baggage</p>


            </div>
            <div class="flight__airline">
                <h3>Air india</h3>
                <p>AE 356</p>
                <p><i class="fa-solid fa-couch"></i> &nbsp; X 12</p>

            </div>
            <div class="flight__price">
            
            <h3><i class="fa-solid fa-indian-rupee-sign"></i>&nbsp; {data?.amount}</h3>
            </div>
            <div class="flight__book admin__controle">
                <Link to={`/update-ticket-on-sale/${data?.id}`} class="edit"> <i class="fa-regular fa-pen-to-square"></i> &nbsp;  Edit</Link>
    <a onClick={deleteTickeOnSale} class="delete"> <i class="fa-solid fa-trash"></i> &nbsp;  Delete</a>
            </div>

            
        </div>
  )
}

export default SellResult