import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState,useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import Loading from "../../../components/Loading";


import Attastaion from "../../../components/Attastations/Attastation";
import AttastationEnlarged from "../../../components/Attastations/AttastationEnlarged";
import { Deleted, errorOccured } from "../../../utlties/Toastes";
import DeleteModelForm from "../../../components/model form/DeleteModelForm";
import Invoice from "../../../components/model form/Invoice";
import panda2 from "../../../assets/padnda5.png"
import { useNavigate } from "react-router-dom";



const Attastations = () => {
  
    const date1=new Date()
    const date2=new Date()
    date1.setDate(date1.getDate()-30)
    date2.setDate(date2.getDate()+30)
  const navigate=useNavigate()
  const { getHeaders,logoutUser } = useContext(AuthContext);
  const [attastations, setAttastations] = useState([]);
  const [q,setQ]=useState("")
  const [from,setFrom]=useState(date1.toISOString().substring(0,10))
  const [to,setTo]=useState(date2.toISOString().substring(0,10))
  const [pageNumber,setPageNumber]=useState(1)
  const [count,setCount]=useState(1)
  const [qholder,setQholder]=useState("")
  const [loading,setLoading]=useState(false)
  const [next,setNext]=useState(null)
  const [attastationEnlarger,setAttastationEnlarger]=useState(null)
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
    .get(`/api/get-attastations?page=${pageNumber}&from=${from}&to=${to}&q=${q}`, getHeaders)
    .then((res) =>{
        console.log(res.data)
        

        setAttastations((prev)=>[...prev,...res.data.results])
        setLoading(false)
        setCount(res.data.count)
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
        
    setAttastations([])
    setQ(qholder)
    setPageNumber(1)
    setDelRefresh((prev)=>!prev)

        
    }


    
  }
  const onSubmitDate=(e,n)=>{
    if(n){
        setAttastations([])
        setQ('')
        setFrom(e)
        setPageNumber(1)
        setDelRefresh((prev)=>!prev)

    }else{
        setQ('')

        setAttastations([])
        setTo(e)
        setPageNumber(1)
        setDelRefresh((prev)=>!prev)

        



    }
}
const confirmDelete=()=>{
  axios.delete(`/api/get-attastation/${deleteContent.id}/`,getHeaders).then((res)=>{
      Deleted()
      setAttastations([])

      setDelRefresh((prev)=>!prev)
      document.getElementById("enlarger__outer__layer4").style.display = "none";

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
            <div className="add__new__button">
              <button>
                {" "}
                <i className="fa-sharp fa-solid fa-plus"></i>&nbsp New
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
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div className="informations">
            <div className="depatures tickets">
              
  
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
              <button onClick={()=>navigate("/create-attastation")}>
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
            <div class="app__dep__header">
            <i class="fa-solid fa-certificate"></i> &nbsp; &nbsp;
            <h3>ATTASTATIONS</h3> <span class="total">{count}</span>
          </div>
              
  <div className="information__flex__container">
  {
    attastations.length==0?(<div class="no_data_error">
    <img src={panda2}/>
    <h2>Empty Attastations....!! </h2>
  
  </div>):(
      <div className="information__flex">
                {attastations?.map((attastationdata) => (
                  <Attastaion setInvoiceContent={setInvoiceContent} setDeleteContent={setDeleteContent} data={attastationdata} setAttastationEnlarger={setAttastationEnlarger}/>
                ))}
              </div>
    )
  }
              
              </div>
            </div>
            {next&&<div class="more" onClick={()=>setPageNumber((prev)=>prev+1)} >Load More</div>
}
          </div>
         <AttastationEnlarged setInvoiceContent={setInvoiceContent} setDeleteContent={setDeleteContent} data={attastationEnlarger}/>
         
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

export default Attastations;
