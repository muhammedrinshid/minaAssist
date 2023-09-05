import React from "react";

const DeleteModelForm = (props) => {
  const deleteContent=props.deleteContent

  const setDeleteContent=props.setDeleteContent
  const confirmDelete=props.confirmDelete


  
  const cancelDeleteAppoinment=()=>{
    setDeleteContent((prev)=>{
      return {...prev,id:'',visibility:false}
    })

  }
  return (
    <div class="delete__box">
      <div class="cancel__icon">
        <ion-icon name="close" class="close__icon" onClick={cancelDeleteAppoinment}></ion-icon>
      </div>
      <div class="cross__img">
        <i class="fa-regular fa-circle-xmark"></i>
      </div>
      <h3>Are you sure?</h3>
      <p>
        {deleteContent.message}
      </p>
      <div class="pop__controler">
        <button class="cancel" onClick={cancelDeleteAppoinment} >Cancel</button>
        <button class="confirm" onClick={()=>confirmDelete()}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteModelForm;
