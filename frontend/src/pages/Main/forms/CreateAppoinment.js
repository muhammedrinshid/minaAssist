import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { appoinmentSchema } from "../../../utlties/Schemas";
import { created, errorOccured } from "../../../utlties/Toastes";

const CreateAppoinment = () => {
  const {headers,logoutUser}=useContext(AuthContext)
  let current = new Date();
  current.setDate(current.getDate() + 15);
 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(appoinmentSchema),
  });

  const onSubmit = (data) => {
    console.log(data)
    data["debit_or_credit"]=false
    axios.post("/api/create-appoinment/",data,{headers}).then((res)=>{
      if(res.status==201){
        created()
        reset()
        
      }
    }).catch((err)=>{
      if (err?.response.status==401) {
        logoutUser()
        
      }
      errorOccured()
    })
   
    
  };
  return (
    <form class="registration__container" onSubmit={handleSubmit(onSubmit)}>
      <div class="registration__header">
        <h1 >PSK Appoinment Form</h1>
        <p>Create new appoinment</p>
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
                placeholder="Applicant name"
                {...register("applicant_name")}
              ></input>
              <p className="error">{errors.applicant_name?.message}</p>
            </div>
          </div>
          <div class="reg__second">
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Submission Date
              </p>
              <input
                type="date"
                {...register("submission_date", {
                  valueAsDate: true,
                })}
                defaultValue={new Date().toISOString().substring(0, 10)}
              ></input>
              <p className="error">{errors.submission_date?.message}</p>
            </div>
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Appoinment Date
              </p>
              <input
                type="date"
                {...register("appoinment_date", {
                  valueAsDate: true,
                })}
                defaultValue={current.toISOString().substring(0, 10)}
              />
              <p className="error">{errors.appoinment_date?.message}</p>
            </div>
          </div>
        </div>
        <div class="registration__row">
          <div class="reg_first">
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Care of
              </p>
              <input
                type="text"
                placeholder="Applicant Care of"
                {...register("care_of")}
              ></input>
              <p className="error">{errors.care_of?.message}</p>
            </div>
          </div>
          <div class="reg__second">
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Contact Number
              </p>
              <input
                type="text"
                placeholder="9876543210"
                {...register("phone")}
              ></input>
              <p className="error">{errors.phone?.message}</p>
            </div>
            <div class="input__field">
              <p>
                <i class="fa-solid fa-star-of-life"></i> Appoinment Time
              </p>
              <input
                type="time"
                class="time"
                min="08:45"
                max="21:00"
                {...register("appoinment_time", {})}
              ></input>
              <p className="error">{errors.appoinment_time?.message}</p>
            </div>
          </div>
        </div>
        <div class="registration__row">
          <div class="reg__second">
            <div class="input__field">
              <p>Site Username</p>
              <input
                type="text"
                name=""
                id=""
                placeholder="Eg: MINAVVMX12"
                {...register("pass_seva_username")}
              ></input>
              <p className="error">{errors.pass_seva_username?.message}</p>
            </div>
            <div class="input__field">
              <p>Site  Password</p>
              <input
                type="text"
                placeholder="Eg: Mm93880#"
                {...register("pass_seva_password")}
              ></input>
              <p className="error">{errors.pass_seva_password?.message}</p>
            </div>
          </div>
          <div class="reg__second">
            <div class="input__field">
              <p>Appoinment office</p>
              <input
                type="text"
                placeholder="Eg: Malappurm"
                {...register("office")}
              ></input>
              <p className="error">{errors.office?.message}</p>
            </div>
            <div class="input__field">
              <p>Type</p>

              <select
                name="appoinment_type"
                id=""
                {...register("appoinment_type")}
              >
                <option value="vfs">VFS</option>
                <option value="passport_seva"> Passport seva</option>
                <option value="other">other</option>
              </select>
              <p className="error">{errors.appoinment_type?.message}</p>
            </div>
          </div>
        </div>
        <div className="registration__row">
          <div className="reg__second">
            <div class="input__field">
              <p>Gross Amount</p>
              <input
                type="text"
                placeholder="Eg: 1700"
                {...register("gross_amount")}
              ></input>
              <p className="error">{errors.gross_amount?.message}</p>
            </div>
            <div class="input__field">
              <p>Net Amount</p>
              <input
                type="text"
                placeholder="Eg: 1500"
                {...register("net_amount")}
              ></input>
              <p className="error">{errors.net_amount?.message}</p>
            </div>
          </div>
          <div className="reg__second">
            <div class="input__field">
              <p>Paid</p>
              <input
                type="text"
                placeholder="Eg: 1700"
                {...register("paid")}
              ></input>
              <p className="error">{errors.paid?.message}</p>
            </div>
          </div>
        </div>
        <div class="registration__row">
          <div class="reg__first notes">
            <div class="input__field">
              <p>Notes</p>
              <textarea {...register("notes")}></textarea>
              <p className="error">{errors.notes?.message}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="registration__footer">
        <div class="registration__confirm">

          <button class="goback" >Go back</button>

          <button class="create" type="submit">
            Create{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateAppoinment;
