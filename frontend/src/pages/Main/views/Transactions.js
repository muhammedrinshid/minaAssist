import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DeleteModelForm from "../../../components/model form/DeleteModelForm";
import AgencyList from "../../../components/transactions/AgencyList";
import TransactionEnlarged from "../../../components/transactions/TransactionEnlarged";
import TransactionList from "../../../components/transactions/TransactionList";
import AuthContext from "../../../context/AuthContext";
import { Deleted, errorOccured } from "../../../utlties/Toastes";


const Transactions = () => {
  const navigate=useNavigate()
  const [pageNumber, setPageNumber] = useState(1);

  const [agencies,setAgencies]=useState([])
  const {headers,getHeaders,logoutUser}=useContext(AuthContext)


  const [agencyId, setAgencyId] = useState(null);
  const [adevancedSearch, setAdvancedSearch] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transactionEnlarger, setTransactionEnlarger] = useState({});
  const [q, setQ] = useState("");
  const [qholder, setQholder] = useState("");
  const [agencyHeader, setAgencyHeader] = useState("Select a Agency");
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [transactions,setTransactions]=useState([])
  const [next,setNext]=useState(null)
  const [deleteContent,setDeleteContent]=useState({
    message:"Do you really want to delete these records? This process cannot be undone,and the Entity related to this transaction also delete",
    visibility:false,
    id:""
})

  const confirmDelete=()=>{
    axios.delete(`/api/transaction/${deleteContent.id}/`,getHeaders).then((res)=>{
        Deleted()
        setTransactions([])
        setSearchTrigger((prev)=>!prev)

        setDeleteContent((prev)=>{
            return {...prev,id:'',visibility:false}
          })
          document.getElementById("enlarger__outer__layer4").style.display = "none";
    }).catch((err)=>{
        errorOccured()
    })
  }

  function seeUsers(n){

    let agencynames=document.getElementById("agencies");
    if(n===1){
        agencynames.style.left='0';
        agencynames.style.zIndex='1'


    }else{

        agencynames.style.left='-600'
        agencynames.style.zIndex='-3'

    }
}

  
  const contextData = {
    q: q,
    from: from,
    to: to,
    agencyId:agencyId,
    searchTrigger:searchTrigger,  


    agencies:agencies,
    pageNumber:pageNumber,
    setPageNumber:setPageNumber,
    setTransactions:setTransactions,
    transactions:transactions,
    agencyHeader:agencyHeader,
    setTransactionEnlarger:setTransactionEnlarger,
    setNext:setNext,
    next:next,
    seeUsers:seeUsers
    
  };
  const contextData2={
    setPageNumber:setPageNumber,
    setQ:setQ,
    setFrom:setFrom,
    setTo:setTo,
    agencyId:agencyId,
    agencies:agencies,
    setAgencyId:setAgencyId,
    setTransactions:setTransactions,
    setAgencyHeader:setAgencyHeader,
    setNext:setNext,
    seeUsers:seeUsers
  }
  useEffect(() => {
    axios.get("/api/get-agencies/", {headers}).then((res)=>{
      setAgencies(res.data)
    }).catch((err)=>{
      if (err?.response.status==401) {
        logoutUser()
        
      }
      errorOccured()
    })
  },[]);
  const onDateChange = (e, n) => {
    if (n) {
      setFrom(e);
    } else {
      setTo(e);
    }
  };
  const handleSubmit=(e)=>{
    if(e.key=="Enter"){
        setQ(qholder)
        setPageNumber(1)
        setTransactions([])
        setSearchTrigger((prev)=>!prev)
    }


  }
  const handleChange=(e)=>{
    setQholder(()=>e.target.value)

  }
  
  return (
    <div>
      <div class="view__control__header">
        <div class="add__new__button" >
          <button onClick={()=>navigate("/create-transaction")}>
            {" "}
            <i class="fa-sharp fa-solid fa-plus"></i>&nbsp; New
          </button>
        </div>
        <div class="controls">
          <div class="by__depature">
            <p class="nowrap">Advanced Search &nbsp;</p>

            <input
              type="checkbox"
              id="switch"
              onChange={() => {
                setFrom('')
                setTo('')
                setAdvancedSearch((prev) => !prev)}}
            />
            <label for="switch">Toggle</label>
          </div>

          {adevancedSearch && (
            <div class="date__picker">
              <p>From </p>

              <input
                type="date"
                name=""
                id="from"
                onChange={(e)=>onDateChange(e.target.value,true)}
              />
            </div>
          )}

          {adevancedSearch && (
            <div class="date__picker">
              <p>To</p>

              <input type="date"  
              onChange={(e)=>onDateChange(e.target.value,false)}

              name="" id="To" />
            </div>
          )}
        </div>
        <div class="control__search">
          <input type="text" placeholder="Search..." onChange={handleChange} onKeyPress={handleSubmit}/>
        </div>
      </div>
      <div class="dealings">
        <AgencyList  contexts={contextData2}  />

        <div class="deals">
          <TransactionList contexts={contextData} />
        </div>
      </div>
      <TransactionEnlarged setDeleteContent={setDeleteContent} data={transactionEnlarger}/>
      {deleteContent.visibility&&(<div className="pop__container">
    
      <DeleteModelForm setDeleteContent={setDeleteContent} deleteContent={deleteContent} confirmDelete={confirmDelete} />
      </div>)}
    </div>
  );
};

export default Transactions;
