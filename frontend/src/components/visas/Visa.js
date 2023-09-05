import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { errorOccured } from '../../utlties/Toastes'


const Visa = (props) => {
  const navigate=useNavigate()
    const { getHeaders,logoutUser } = useContext(AuthContext);
    const setDeleteContent=props.setDeleteContent
    const setInvoiceContent=props.setInvoiceContent
    const deleteVisa=()=>{

      setDeleteContent((prev)=>{
        return {...prev,id:data?.id,visibility:true}
      })
    }


    const data=props.data
    const setVisaEnlarger=props.setVisaEnlarger

    const getVisatData=()=>{
        axios.get(`/api/visa/${data.id}/`,getHeaders).then((res)=>{
          console.log(res.data)
            setVisaEnlarger(()=>res.data)
            
            let block=document.getElementById("enlarger__outer__layer4")
             block.style.display='block'
  
  
        }).catch((err)=>{
          if (err?.response.status==401) {
            logoutUser()
            
          }
          errorOccured()
        })
        
    }
    const invoiceFormController=()=>{

      const details={
          gross__amount:data?.gross_amount,
          count:1,
          item:data?.visa_mode+" visa",
          title:data?.applicant_name+" "+data?.country.name+' '+data?.visa_type+" visa",
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
        C/O {data?.care_of}
    </div>
    <div class="call"><a href={"tel:+91"+data?.phone}><i class="fa-solid fa-phone-volume"></i>
            &nbsp;{data?.phone}</a></div>
    <div class="booked">
        <p class="nowrap"><i class="fa-solid fa-paper-plane"></i> {data?.remitted_date}</p>
        <p class="nowrap visa__agency"><i class="fa-sharp fa-solid fa-building-columns"></i>{data?.agency?data.agency?.name+" "+data.agency?.branch:null}</p>

    </div>
    <div class="more" onClick={getVisatData}>More</div>
    <div class="passport__number">{data?.pass_number}</div>
    <div class="country"><img src={"https://flagcdn.com/48x36/"+(data.country.code?.toLowerCase())+".png"} alt=""/></div>

    <div class="depature__edit"><i class="fa-solid fa-pen-to-square" onClick={()=>navigate(`/update-visa/${data?.id}`)}></i></div>
    <div class="invoice"><i class="fa-sharp fa-solid fa-file-invoice" onClick={()=>invoiceFormController()}></i></div>

    <div class="depature__delete"><i class="fa-solid fa-trash" onClick={deleteVisa}></i></div>


</div>  )
}

export default Visa