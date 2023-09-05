import axios from 'axios'
import React,{useEffect,useContext, useState} from 'react'
import AuthContext from '../../context/AuthContext'
import Loading from '../Loading';
import Depature from './Depature';
import pandaazz from "../../assets/pandaazz.png"
import { errorOccured } from '../../utlties/Toastes';



const Depatures = (props) => {
    const [loading,setLoading]=useState(false)
    const {getHeaders,logoutUser}=useContext(AuthContext)
    const [depatures,setDepatures]=useState([])
    useEffect(()=>{
        setLoading(true)
        axios.get(`/api/get-tickets?from=${props.from}&to=${props.from}&q=${props.q}`,getHeaders).then(
          (res)=>{
        setLoading(false)
        setDepatures(()=>res.data.results)


        }).catch((err)=>{
          if (err?.response.status==401) {
            logoutUser()
            
          }
          errorOccured()
        })
    },[props.from,props.q])
    if (loading) {
      <Loading/>

      
    }

    if(depatures.length==0){
      return (
        <div class="depatures">

                            
        <div class="app__dep__header"><i class="fa-solid fa-plane-departure"></i> &nbsp; &nbsp;<h3>
            DEPATURES</h3> <span class="total">{depatures.length}</span></div>
            <div class="no_data_error" style={{
              maxHeight:"40vh"
            }}>
                <img src={pandaazz}/>
                <h2>Empty Departure....!! </h2>

            </div>
            
           
        
    </div>
        )
      }

    return (
      <div class="depatures">

      <div class="information__flex" style={{
        height:"40vh"
      }}>
          
         <div class="app__dep__header"><i class="fa-solid fa-plane-departure"></i> &nbsp; &nbsp;<h3>
          DEPATURES</h3> <span class="total">{depatures.length}</span>
        </div>
        {depatures.map((depature)=>(<Depature data={depature} setDepatureEnlarger={props.setDepatureEnlarger}/> ))}
       
    
      </div>
  </div>
      )
  

  }
 

export default Depatures