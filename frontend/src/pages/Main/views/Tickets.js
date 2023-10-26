import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import DeleteModelForm from "../../../components/model form/DeleteModelForm";
import Invoice from "../../../components/model form/Invoice";
import SingleTicket from "../../../components/tickets/SingleTicket";
import TicketEnlarged from "../../../components/tickets/TicketEnlarged";
import AuthContext from "../../../context/AuthContext";
import { Deleted, errorOccured } from "../../../utlties/Toastes";

const Tickets = () => {
  const {getHeaders,logoutUser}=useContext(AuthContext)
  const navigate=useNavigate()
  const date1 = new Date();
  const date2 = new Date();
  date2.setDate(date2.getDate() + 30);
  date1.setDate(date1.getDate() - 30);
  const [order, setOrder] = useState(true);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(date1.toISOString().substring(0, 10));
  const [q, setQ] = useState("");
  const [to, SetTo] = useState(date2.toISOString().substring(0, 10));
  const [qholder, setQholder] = useState("");
  const [tickets, setTickets] = useState([]);
  const [ticketEnlarger, setTicketEnlarger] = useState(null);
  const [next, setNext] = useState(null);
  const [count,setCount]=useState(0)
  const [pageNumber, setPageNumber] = useState(1);
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
  const onDateChange = (n, date) => {
    setTickets([]);
    setPageNumber(1);
    setQ("");
    if (n) {
      setFrom(date);
    } else {
      SetTo(date);
    }
    setDelRefresh((prev)=>!prev)

  };
  const onQchange = (e) => {
    setQholder(e.target.value);
  };

  const qSubmit = (e) => {
    if (e.key == "Enter") {
      setTickets([]);
      setPageNumber(1);
      setQ(qholder);
      setDelRefresh((prev)=>!prev)

    }
  };

  const onSubmitOrder = () => {
    setPageNumber(1);
    setTickets([]);
    setQ("");
    setOrder((prev) => !prev);
    setDelRefresh((prev)=>!prev)

  };

  useEffect(()=>{
    setLoading(true)
    axios.get( `/api/get-tickets?page=${pageNumber}&from=${from}&to=${to}&q=${q}&order=${order}`,
    getHeaders).then((res)=>{
      setTickets((prev)=>[...prev,...res.data.results])
      setLoading(false)
      setNext(res.data.next)
      setCount(res.data.count)

    }).catch((err)=>{
      if (err?.response.status==401) {
        logoutUser()
        
      }
      errorOccured()
    })
  },[delRefresh])
  const confirmDelete=()=>{
    axios.delete(`/api/depature/${deleteContent.id}/`,getHeaders).then((res)=>{
        Deleted()
        setTickets([])

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
    return(
      <Loading/>
    )
    
  }

  return (
    <div>
      <div class="view__control__header">
        <div class="add__new__button">
          <button onClick={()=>navigate("/create-ticket")}>
            {" "}
            <i class="fa-sharp fa-solid fa-plus"></i>&nbsp; New
          </button>
        </div>
        <div class="controls">
          <div class="by__depature">
            <p class="nowrap">By Depature &nbsp;</p>

            <input type="checkbox"  onChange={(e)=>{

              setPageNumber(1);
    setTickets([]);
    setQ("");
    setOrder((prev) => !prev);  
    setDelRefresh((prev)=>!prev)
            }}               id="switch"
            />
            <label for="switch">Toggle</label>
            
          </div>

          <div class="date__picker">
            <p>From </p>

            <input type="date" name="" id="from" defaultValue={from} onChange={(e)=>onDateChange(true,e.target.value)} />
          </div>
          <div class="date__picker">
            <p>To</p>

            <input type="date" name="" id="To" defaultValue={to} onChange={(e)=>onDateChange(false,e.target.value)} />
          </div>
        </div>
        <div class="control__search">
          <input type="text" placeholder="Search..." defaultValue={qholder} onChange={onQchange} onKeyPress={qSubmit} />
        </div>
      </div>
      <div class="informations">
        <div class="depatures tickets">
          <div class="app__dep__header">
            <i class="fa-solid fa-plane-departure"></i> &nbsp; &nbsp;
            <h3>ISSUED TICKETS</h3> <span class="total">{count}</span>
          </div>

          <div className="information__flex__container">
          <div class="information__flex">

          {tickets?.map((data)=>(
            <SingleTicket setInvoiceContent={setInvoiceContent} setDeleteContent={setDeleteContent} data={data} setTicketEnlarger={setTicketEnlarger}/>
          ))}

          
          </div>
          </div>
          {next&&<div class="more" onClick={()=>{
            
            setPageNumber((prev)=>prev+1)
            console.log("page number updated",pageNumber)
          
          }} >Load More</div>}

        </div>
      </div>
      <TicketEnlarged ticketEnlarger={ticketEnlarger} setDeleteContent={setDeleteContent} setInvoiceContent={setInvoiceContent}/>
      {deleteContent.visibility&&(<div className="pop__container">
    
          <DeleteModelForm setDeleteContent={setDeleteContent} deleteContent={deleteContent} confirmDelete={confirmDelete} />
          </div>)}
          {invoiceContent.visibility&&(<div className="pop__container" >
          <Invoice setInvoiceContent={setInvoiceContent} invoiceContent={invoiceContent}/>
    
          </div>)}
    </div>
  );
};

export default Tickets;
