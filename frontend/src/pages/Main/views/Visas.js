import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState,useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import Visa from "../../../components/visas/Visa";
import Loading from "../../../components/Loading";
import VisaEnlarged from "../../../components/visas/VisaEnlarged";
import { Deleted, errorOccured } from "../../../utlties/Toastes";
import DeleteModelForm from "../../../components/model form/DeleteModelForm";
import Invoice from "../../../components/model form/Invoice";
import { Link, useNavigate } from "react-router-dom";
import panda2 from "../../../assets/padnda5.png"


const Visas = () => {
    const date1=new Date()
    const date2=new Date()
    date1.setDate(date1.getDate()-30)
    date2.setDate(date2.getDate()+30)
  const navigate=useNavigate()
  const { getHeaders,logoutUser } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [type,setType]=useState(false)
  const [q,setQ]=useState("")
  const [from,setFrom]=useState(date1.toISOString().substring(0,10))
  const [to,setTo]=useState(date2.toISOString().substring(0,10))
  const [pageNumber,setPageNumber]=useState(1)
  const [qholder,setQholder]=useState("")
  const [loading,setLoading]=useState(false)
  const [next,setNext]=useState(null)
  const [visaEnlarger,setVisaEnlarger]=useState(null)
  const [delRefresh,setDelRefresh]=useState(false)
  const [invoiceContent,setInvoiceContent]=useState({
    visibility:false,
    details:{
      gross__amount:'',
      item:"",
      count:'',
      title:'',
      paid:"",
      name:'',
      care_of:''

    }
  })

  const [deleteContent,setDeleteContent]=useState({
    message:"Do you really want to delete these records? This process cannot be undone,and 'Transaction' related to this visa also delete",
    visibility:false,
    id:""
})
  useEffect(()=>{
    setLoading(true)
    axios
    .get(`/api/get-visas?page=${pageNumber}&from=${from}&to=${to}&q=${q}&type=${type}`, getHeaders)
    .then((res) =>{
        console.log(res.data)
        

        setVisas((prev)=>[...prev,...res.data.results])
        setLoading(false)
        setNext(res.data.next)
        
    }
        ).catch((err)=>{
          if (err?.response.status==401) {
            logoutUser()
            
          }
          errorOccured()
        })
  },[delRefresh])

  

  const handleChange=(e)=>{
    setQholder(e.target.value)

  }
  const handleSubmit=(e)=>{
    if (e.key=='Enter') {
        
    setVisas([])
    setQ(qholder)
    setPageNumber(1)
    setDelRefresh((prev)=>!prev)

        
    }


    
  }
  const onSubmitDate=(e,n)=>{
    if(n){
        setVisas([])
        setQ('')
        setFrom(e)
        setPageNumber(1)
        setDelRefresh((prev)=>!prev)

    }else{
        setQ('')

        setVisas([])
        setTo(e)
        setPageNumber(1)
        setDelRefresh((prev)=>!prev)



    }
}
const nextPage = () => {
  setPageNumber((prev) => prev + 1);
};

    const typeChange=(k)=>{
      
        if(k){
            setType(true)
        }else{
            setType(false)
        }
        setQ('')
        setType((prev)=>!prev)
        setPageNumber(1)
        setVisas([])
        setDelRefresh((prev)=>!prev)

        
    }

    const confirmDelete=()=>{
      axios.delete(`/api/visa/${deleteContent.id}/`,getHeaders).then((res)=>{
          Deleted()
          setVisas([])
  
          setDelRefresh((prev)=>!prev)
          setDeleteContent((prev)=>{
              return {...prev,id:'',visibility:false}
            })
      }).catch((err)=>{
        if (err?.response.status==401) {
          logoutUser()
          
        }
        errorOccured()
      })
    }




if (loading) {

    return (
        
        <div>
          <div className="view__control__header">
            <div  className="add__new__button">
              <button onClick={()=>navigate("/create-visa")} >
                {" "}
                <i className="fa-sharp fa-solid fa-plus"></i>&nbsp; New
              </button>
            </div>
            <div className="controls">
              <div className="date__picker">
                <p>From </p>
  
                <input type="date" name="" id="from" />
              </div>
              <div className="date__picker">
                <p>To</p>
  
                <input type="date" name="" id="To"></input>
              </div>
            </div>
            <div className="control__search">
              <input type="text" defaultValue={qholder} placeholder="Search..." />
            </div>
          </div>
          <div className="informations">
            <div className="depatures tickets">
              <div className="app__dep__header visa__controler">
                <div className="information__link" >E-visa</div>
                <div className="information__link" >Stambing</div>
              </div>
  
              <div className="">
                <Loading/>
              </div>
            </div>
          </div>
        </div>
      );
    
}

    return (
        
        <div>
          <div className="view__control__header">
            <div className="add__new__button">
              <button>
                {" "}
                <i className="fa-sharp fa-solid fa-plus"></i>&nbsp; New
              </button>
            </div>
            <div className="controls">
              <div className="date__picker">
                <p>From </p>
  
                <input type="date" id="from" defaultValue={from} onChange={(e)=>onSubmitDate(e.target.value,true)}  />
              </div>
              <div className="date__picker">
                <p>To</p>
  
                <input type="date" name="" id="To" defaultValue={to} onChange={(e)=>onSubmitDate(e.target.value,false)}></input>
              </div>
            </div>
            <div className="control__search">
              <input type="text" placeholder="Search..." onChange={handleChange} onKeyPress={handleSubmit}/>
            </div>
          </div>
          <div className="informations">
            <div className="depatures tickets">
              <div className="app__dep__header visa__controler">
                <div className={!type?"information__link active__information__link visa__link":"information__link"} onClick={()=>typeChange(true)}>Stambing</div>
                <div className={type?"information__link active__information__link visa__link":"information__link"} onClick={()=>typeChange(false)}>E-visa</div>
              </div>
  <div className="information__flex__container">
  {visas.length==0?(<div class="no_data_error">
  <img src={panda2}/>
  <h2>Empty Visas....!! </h2>

</div>):(
    <div className="information__flex">
  {visas?.map((visadata) => (
    <Visa setInvoiceContent={setInvoiceContent} setDeleteContent={setDeleteContent} data={visadata} setVisaEnlarger={setVisaEnlarger}/>
  ))}
</div>
    

  )}
              
              </div>
            </div>
            {next&&<div class="more" onClick={nextPage} >Load More</div>
}

          </div>
          <VisaEnlarged setInvoiceContent={setInvoiceContent} data={visaEnlarger} setDeleteContent={setDeleteContent}/>

          {deleteContent.visibility&&(<div className="pop__container">
    
          <DeleteModelForm setDeleteContent={setDeleteContent} deleteContent={deleteContent} confirmDelete={confirmDelete} />
          </div>)}
          
          {invoiceContent.visibility&&(<div className="pop__container" >
          <Invoice setInvoiceContent={setInvoiceContent} invoiceContent={invoiceContent}/>
    
          </div>)}
          
          
        </div>
      );
    

}
  
;

export default Visas;
