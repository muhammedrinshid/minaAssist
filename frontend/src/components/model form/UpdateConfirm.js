import axios from 'axios'
import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { errorOccured, updated } from '../../utlties/Toastes'

 const UpdateConfirm = (props) => {
    const {fileUploadHeaders,updateTocken}=useContext(AuthContext)
    const setProfileUpdate=props.setProfileUpdate
    const profileUpdate=props.profileUpdate
  const cancelUpdate=()=>{
    setProfileUpdate((prev)=>{
      return {...prev,confirm:false}
    })
}
const onUpdate=()=>{
    axios.put( `/api/profile/`,profileUpdate?.profileData,fileUploadHeaders).then((res)=>{
        updated()
        updateTocken()
        setProfileUpdate({
            visibility:false,
            profileData:{
        
            },
            confirm:false
          })


    }).catch((err)=>{
        errorOccured()

    })
}

  return (
    <div class="delete__box">
    <div class="cancel__icon">
      <ion-icon name="close" class="close__icon" onClick={cancelUpdate}></ion-icon>
    </div>
    <div class="cross__img">
      <i class="fa-regular fa-circle-xmark"></i>
    </div>
    <h3>Are you sure?</h3>
    <p>
      The profile data will change
    </p>
    <div class="pop__controler">
      <button class="cancel" onClick={cancelUpdate} >Cancel</button>
      <button class="confirm" onClick={()=>onUpdate()}>Update</button>
    </div>
  </div>  )

}
export default UpdateConfirm