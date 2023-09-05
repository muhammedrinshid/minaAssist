import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DeleteModelForm from "../../../../components/model form/DeleteModelForm";
import AuthContext from "../../../../context/AuthContext";
import { agencySchema } from "../../../../utlties/Schemas";
import { Deleted, errorOccured, updated } from "../../../../utlties/Toastes";

const UpdateAgency = () => {

  const { fileUploadHeaders, getHeaders,logoutUser} = useContext(AuthContext);
  const [agencies, setAgencies] = useState([]);
  const [agencyInForm, SetAgencyInForm] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(agencySchema),
  });
  const [deleteContent,setDeleteContent]=useState({
    message:"Do you really want to delete these Agency? This process cannot be undone,and all records and transactions of this agency also delete",
    visibility:false,
    id:""
})
const confirmDelete=()=>{
  axios.delete(`/api/agency/${deleteContent.id}/`,getHeaders).then((res)=>{
      Deleted()
      setDeleteContent((prev)=>{
        return {...prev,id:'',visibility:false}
      })
      reset()

      SetAgencyInForm({})
      getAgencies()

      
  }).catch((err)=>{
      errorOccured()
  })
}

  const [picture, setPicture] = useState({
    selectedFile: null,
  });
 

  useEffect(() => {
    getAgencies();
    
  }, []);
  const getAgencies = () => {
    axios
      .get("/api/get-agencies/", getHeaders)
      .then((res) => {
        setAgencies(res.data);
      })
      .catch((error) => errorOccured);
  };

  const onAgencyChange = (id) => {
    axios
      .get(`/api/agency/${id}`, getHeaders)
      .then((res) => {
        SetAgencyInForm(res.data);
        reset(res.data);
        setDeleteContent((prev)=>{
          return {...prev,id:id}
        })
      })
      .catch((error) => errorOccured);
  };
  const openDeleteConfirmation=()=>{
    setDeleteContent((prev)=>{
      return {...prev,visibility:true}
    })
  }

  const onFileChange = (e) => {
    setPicture({
      selectedFile: e.target.files[0],
    });
  };

  const onSubmit = (data) => {
    const formData=new FormData()
    console.log(picture.selectedFile)

    if (picture.selectedFile){
      formData.append("image",picture?.selectedFile,picture?.selectedFile?.name)


    }

    formData.append("name",data.name)
    formData.append("branch",data.branch)
    formData.append("short_name",data.short_name)
    axios.put(`/api/agency/${agencyInForm.id}/`,formData,fileUploadHeaders).then((res)=>{
      updated()
      reset()
      getAgencies()
      setPicture({
        selectedFile:null,
      })
      
      }).catch((err)=>{
        errorOccured()
        if (err.response.status==401) {
          logoutUser()
        }
      })
  };
  return (
    <div class="dealings">
      <div class="agency__names" id="agencies">
        {agencies.map((agency) => (
          <div class="agency__name" onClick={() => onAgencyChange(agency?.id)}>
            <img src={agency.image} alt="" />
            <div class="agency__details">
              <h4>{agency?.name}</h4>
              <p>{agency?.branch}</p>
            </div>
          </div>
        ))}
      </div>
      <div class="deals">
        <div class="deals__body">
          <form
            class="registration__container"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div class="registration__header">
              <h1>Agency Update</h1>
              <p>Update Agency</p>
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
                <div class="reg__first">
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
                </div>
              </div>

              <div class="registration__row">
                <div className="reg__first">
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
                <div class="reg__first notes">
                  <div class="upload-btn-wrapper">
                    <button class="btn">Drop Image </button>
                    <input
                      typeof="jpeg"
                      onChange={(e) => onFileChange(e)}
                      type="file"
                      name="myfile"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="registration__footer">
              <div class="registration__confirm">
{agencyInForm?.id&&<button onClick={()=>openDeleteConfirmation()} type="button" class="goback  delete">Delete</button>}                <button type="submit"  class="create">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {deleteContent.visibility&&(<div className="pop__container">
    
      <DeleteModelForm setDeleteContent={setDeleteContent} deleteContent={deleteContent} confirmDelete={confirmDelete} />
      </div>)}
    </div>
  );
};

export default UpdateAgency;
