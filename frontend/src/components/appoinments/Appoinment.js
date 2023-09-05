import axios from 'axios'
import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { errorOccured } from '../../utlties/Toastes'

const Appoinment = (props) => {
  const navigate=useNavigate()

  
  const setAppoinmentEnlarger=props.setAppoinmentEnlarger
  const setInvoiceContent=props.setInvoiceContent
  const {getHeaders,logoutUser}=useContext(AuthContext)
    const data=props.data
    const setDeleteContent=props.setDeleteContent
    const deleteAppoinment=()=>{

      setDeleteContent((prev)=>{
        return {...prev,id:data?.id,visibility:true}
      })
    }

    const getAppoinmentData=()=>{
      axios.get(`/api/appoinment/${data.id}/`,getHeaders).then((res)=>{
        console.log(res.data)
          setAppoinmentEnlarger(()=>res.data)
          
          let block=document.getElementById("enlarger__outer__layer3")
           block.style.display='block'


      }).catch((err)=>{
        errorOccured()
        if (err.response.status==401) {

          logoutUser()
          
        }
      })
      
  }
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

    <div class="depature">
    <div class="name">
        <h5>{data?.applicant_name}</h5>
    </div>
    <div class="careof">
      C/o {data?.care_of}
    </div>
    <div class="call"><a href={`tel:91989`}><i class="fa-solid fa-phone-volume"></i>
            &nbsp;{data?.phone}</a></div>
            {data?.paid==0?(<div class="payment notpaid">not paid</div>)
            :data?.paid==data.gross_amount?(<div class="payment paid">paid</div>):(<div class="payment advanced">advanced</div>)}

    <div class="booked">
        <p class="nowrap"> <i class="fa-solid fa-bell"></i>{data?.submission_date?.substring(0,10)}</p>
        
        <p class="nowrap"><i class="fa-solid fa-upload"></i>{data?.appoinment_date?.substring(0,10)}</p>

    </div>
    <div class="message"><i class="fa-solid fa-comment-sms"></i></div>
    <div class="invoice"><i class="fa-sharp fa-solid fa-file-invoice"  onClick={()=>invoiceFormController()}></i></div>
    <div class="more" onClick={getAppoinmentData}>More</div>

    <div class="depature__edit"><i class="fa-solid fa-pen-to-square" onClick={()=>navigate(`/update-appoinment/${data.id}`)}></i></div>
    <div class="depature__delete"><i class="fa-solid fa-trash" onClick={()=>deleteAppoinment(data?.id)}></i></div>


</div>
  )
}

export default Appoinment