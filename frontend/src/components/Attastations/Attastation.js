import axios from 'axios'
import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { errorOccured } from '../../utlties/Toastes';


const Attastaion = (props) => {
    // const {getHeaders}=useContext(AuthContext)
    const { getHeaders,logoutUser } = useContext(AuthContext);


    const data=props.data
    const setAttastationEnlarger=props.setAttastationEnlarger
    const setInvoiceContent=props.setInvoiceContent
    const setDeleteContent=props.setDeleteContent
    const deleteAttastation=()=>{

      setDeleteContent((prev)=>{
        return {...prev,id:data?.id,visibility:true}
      })
    }


    const getAttastationData=()=>{
        axios.get(`/api/get-attastation/${data.id}/`,getHeaders).then((res)=>{
          console.log(res.data)
            setAttastationEnlarger(()=>res.data)
             
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
          item:"Certificate Attastation",
          title:data?.certificate+" certificate attastaton "+data?.country.name,
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
    <div class="call"><a href="tel:+"><i class="fa-solid fa-phone-volume"></i>
            &nbsp;{data?.phone}</a></div>
    <div class="booked">
        <p class="nowrap"><i class="fa-solid fa-paper-plane"></i> {data?.remitted_date}</p>
        <p class="nowrap visa__agency"><i class="fa-sharp fa-solid fa-building-columns"></i>{data?.agency?data.agency?.name+" "+data.agency?.branch:null}</p>

    </div>
    <div class="more" onClick={getAttastationData}>More</div>
    <div class="airline">{data?.certificate}</div>
    <div class="country"><img src={"https://flagcdn.com/48x36/"+(data.country.code.toLowerCase())+".png"} alt=""/></div>
    <div class="invoice"><i class="fa-sharp fa-solid fa-file-invoice" onClick={()=>invoiceFormController()}></i></div>

    <div class="depature__edit"><i class="fa-solid fa-pen-to-square"></i></div>
    <div class="depature__delete"><i class="fa-solid fa-trash" onClick={deleteAttastation}></i></div>


</div>  )
}

export default Attastaion