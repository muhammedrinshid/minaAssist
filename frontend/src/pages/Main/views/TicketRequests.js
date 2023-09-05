import axios from 'axios'
import React,{useState,useEffect,useContext} from 'react'
import Loading from '../../../components/Loading'
import DeleteModelForm from '../../../components/model form/DeleteModelForm'
import TicketRequest from '../../../components/ticket_requests/TicketRequest'
import TicketRequestEnlarged from '../../../components/ticket_requests/TicketRequestEnlarged'
import AuthContext from '../../../context/AuthContext'
import panda2 from "../../../assets/padaaz2.png"


import { Deleted, errorOccured } from '../../../utlties/Toastes'
import { Link, useNavigate } from 'react-router-dom'

const TicketRequests = () => {
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  const {getHeaders,logoutUser}=useContext(AuthContext)
  const [ticketRequests,setTicketRequests]=useState([])
  const [q,setQ]=useState("")
  const [qholder,setQholder]=useState("")
  const [ticketEnlarger, setTicketEnlarger] = useState(null);
  const [deleteContent,setDeleteContent]=useState({
    message:"Do you really want to delete these records? This process cannot be undone",
    visibility:false,
    id:""
})
const [delRefresh,setDelRefresh]=useState(false)



  useEffect(()=>{
    setLoading(true)
    axios.get( `/api/get-ticket-requests?q=${q}`,getHeaders).then((res)=>{
      setTicketRequests(res.data)

      setLoading(false)


    }).catch((err)=>{
      errorOccured()
      if (err?.response?.status==401) {
        logoutUser()
        
      }

    })

  },[delRefresh])

  const onQchange=(e)=>{
    setQholder(e.target.value)


  }
  const qSubmit=(e)=>{
    if (e.key=="Enter") {
      setQ(qholder)
      setDelRefresh((prev)=>!prev)

      
    }

  }
  const confirmDelete=()=>{
    axios.delete(`/api/ticket-request/${deleteContent.id}/`,getHeaders).then((res)=>{
        Deleted()
        setTicketRequests([])

        setDelRefresh((prev)=>!prev)
        setDeleteContent((prev)=>{
            return {...prev,id:'',visibility:false}
          })
          document.getElementById("enlarger__outer__layer1").style.display = "none";

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
          <button onClick={   ()=>navigate("/create-ticket-request ")} >
            {" "}
            <i class="fa-sharp fa-solid fa-plus"></i>&nbsp; New
          </button>
        </div>
        <div class="controls">
          
        </div>
        <div class="control__search">
          <input type="text" placeholder="Search..." onChange={onQchange} onKeyPress={qSubmit} />
        </div>
      </div>
      <div class="informations">
        <div class="depatures tickets">
          <div class="app__dep__header">
            <i class="fa-solid fa-ticket"></i> &nbsp; &nbsp;
            <h3>TICKET REQUESTS</h3> <span class="total">{TicketRequest.length}</span>
          </div>

          <div className="information__flex__container">   
          
          {ticketRequests.length==0?(<div class="no_data_error">
          <img src={panda2}/>
          <h2>You have no ticket requests....!! </h2>

      </div>):(<div class="information__flex">

          {ticketRequests?.map((data)=>(
            <TicketRequest setDeleteContent={setDeleteContent} data={data} setTicketEnlarger={setTicketEnlarger}/>
          ))}

          
          </div>)}
          
        
          </div>


        </div>
      </div>
      <TicketRequestEnlarged setDeleteContent={setDeleteContent} ticketEnlarger={ticketEnlarger}/>
      {deleteContent.visibility&&(<div className="pop__container">
    
      <DeleteModelForm setDeleteContent={setDeleteContent} deleteContent={deleteContent} confirmDelete={confirmDelete} />
      </div>)}
    </div>
  )
}

export default TicketRequests