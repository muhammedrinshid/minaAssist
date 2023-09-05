import axios from 'axios'
import React,{useState,useContext,useEffect} from 'react'
import AuthContext from '../../context/AuthContext'
import { Deleted, errorOccured } from '../../utlties/Toastes'
import DeleteModelForm from '../model form/DeleteModelForm'
import SellResult from './SellResult'

const SellTicket = () => {
    const {getHeaders}=useContext(AuthContext)
    const [myTickets,setMyTickets]=useState([])
    const [deleteContent,setDeleteContent]=useState({
        message:"Do you really want to delete these records? This process cannot be undone",
        visibility:false,
        id:""
    })

    const getMyTickets=()=>{
        axios.get(`/api/get-my-ticket-on-sales/`,getHeaders).then((res)=>{
            setMyTickets(res.data)
        }).catch((err)=>{
            errorOccured()
        })
    }
    useEffect(()=>{
        getMyTickets()
    },[])
    const confirmDelete=()=>{
        axios.delete(`/api/get-ticket-on-sale/${deleteContent.id}/`,getHeaders).then((res)=>{
            Deleted()
           
    
            getMyTickets()
            setDeleteContent((prev)=>{
                return {...prev,id:'',visibility:false}
              })
        }).catch((err)=>{
            errorOccured()
        })
      }
    
  return (
    <div class="flight__container">
   
    <div class="flight__search__results">
    {myTickets.map((flight)=>( <SellResult data={flight} setDeleteContent={setDeleteContent} />))}
   
        
        
    </div>
    {deleteContent.visibility&&(<div className="pop__container">
    
    <DeleteModelForm setDeleteContent={setDeleteContent} deleteContent={deleteContent} confirmDelete={confirmDelete} />
    </div>)}

</div>
  )
}

export default SellTicket