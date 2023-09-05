import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { agencySchema } from "../../../utlties/Schemas";
import { created, errorOccured } from "../../../utlties/Toastes";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { json } from "react-router-dom";




const AddAgency = () => {
  const [picture,setPicture]=useState({
    selectedFile:null
  })

  const onFileChange=(e)=>{
    setPicture({
      selectedFile:e.target.files[0]
    })
  }
  const {fileUploadHeaders}=useContext(AuthContext)
  const { register, handleSubmit ,formState:{errors},reset} = useForm({
    
    resolver:yupResolver(agencySchema)
  });
  const onSubmit = (data) => {

    const formData=new FormData()

    if (picture.selectedFile){
      formData.append("image",picture?.selectedFile,picture?.selectedFile?.name)


    }    formData.append("name",data.name)
    formData.append("branch",data.branch)
    formData.append("short_name",data.short_name)

   

    axios.post("/api/create-agency/",formData,fileUploadHeaders).then((res)=>{
      if(res.status==201){
        created()
        reset()
        
      }
    }).catch((err)=>{
     errorOccured()
    })
  };

  return (
    <form class="registration__container" onSubmit={handleSubmit(onSubmit)}>
      <div class="registration__header">
        <h1>Agency Creation</h1>
        <p>Create New Agency</p>
      </div>
      <div class="registration__body">
        <div class="registration__row">
          <div class="reg_first">
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Name
              </p>
              <input
                type="text"
                placeholder="Agency name"
                {...register("name")}
              />
              <p className="error">{errors.name?.message}</p>

            </div>
          </div>
          <div class="reg__second">
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Branch
              </p>
              <input
                type="text"
                placeholder="Agency name"
                {...register("branch")}
              />
              <p className="error">{errors.branch?.message}</p>

            </div>

            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Short Name
              </p>
              <input
                type="text"
                placeholder="short name"
                {...register("short_name")}
              />
              <p className="error">{errors.short_name?.message}</p>

            </div>
          </div>
        </div>
      
        <div class="registration__row">
          <div class="reg__first notes">
            <div class="input__field">
              <p>Remarks</p>
              <textarea {...register("remarks")}></textarea>
            </div>
          </div>
        
        </div>
        <div className="registration__row">
        <div className="reg__second">
            <div class="upload-btn-wrapper">
              <button class="btn">Drop Image </button>
              <input typeof="jpeg" onChange={(e)=>onFileChange(e)} type="file" name="myfile" />
            </div>
          </div>
        </div>
      </div>
      <div class="registration__footer">
        <div class="registration__confirm">
          <button class="goback">Go back</button>
          <button type="submit" class="create" >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddAgency;
