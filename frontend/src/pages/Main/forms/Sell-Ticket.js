import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AirlineSelect from "../../../components/AirlineSelect";
import AirportSelect from "../../../components/AirportSelect";
import AuthContext from "../../../context/AuthContext";
import { sellTicketSchema } from "../../../utlties/Schemas";
import { created, errorOccured } from "../../../utlties/Toastes";

const SellTicket = () => {
  const {headers,logoutUser}=useContext(AuthContext)
  const methods = useForm({
    resolver:yupResolver(sellTicketSchema)
  });
  const clearForm = () => {
    document.getElementById("sellticketForm").reset();
  };
  const {errors}=methods.formState

  const onsubmit = (data) => {
    axios.post("/api/ticken-on-sale/",data,{headers}).then((res)=>{
      if (res.status==201) {
        created()
        clearForm()
        
      }
      

    }).catch((err)=>{
      if(err.response.status===401){
        logoutUser()
        
      }else{
        errorOccured()
      }
      
    })
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form
      id="sellticketForm"
        class="registration__container"
        onSubmit={methods.handleSubmit(onsubmit)}
      >
        <div class="registration__header">
          <h1>Sell Ticket</h1>
          <p>Sell Your Tickets</p>
        </div>
        <div class="registration__body">
          <div class="registration__row">
            <div class="reg__second">
              <div className="input__field">
                <p>From</p>

                <AirportSelect registerName={{ Name: "depature_port" }} />
                
                <p className="error">{errors.depature_port?.message}</p>
              </div>{" "}
              <div className="input__field">
                <p>From</p>

                <AirportSelect registerName={{ Name: "arrival_port" }} />
                <p className="error">{errors.arrival_port?.message}</p>
              </div>
            </div>
            <div class="reg__second reg__third">
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Date of Depature
                </p>
                <input
                  type="date"
                  class="currentdate"
                  id="from"
                  {...methods.register("date", {
                    valueAsDate: true,
                  })}
                />
                <p className="error">{errors.date?.message}</p>

              </div>
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Time of Depature
                </p>
                <input type="time" {...methods.register("depature_time")} />
                <p className="error">{errors.depature_time?.message}</p>

              </div>
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Time of Arrival
                </p>
                <input type="time" {...methods.register("arrival_time")} />
                <p className="error">{errors.arrival_time?.message}</p>

              </div>
            </div>
          </div>
          <div class="registration__row">
            <div class="reg__second">
              <div className="input__field">
                <p>Airlines</p>
                <AirlineSelect />
                <p className="error">{errors.airline?.message}</p>

              </div>
              <div className="input__field">
                <p>
                  <i className="fa-solid fa-star-of-life"></i> Number of Seats
                </p>
                <input
                  type="number"
                  max={50}
                  defaultValue={1}
                  min={1}
                  placeholder="number of passenger"
                  {...methods.register("seats")}
                />
                <p className="error">{errors.seats?.message}</p>

              </div>
            </div>
            <div class="reg__second">
              <div className="input__field">
                <p>
                  <i className="fa-solid fa-star-of-life"></i> Number of Stops
                </p>
                <input
                  type="number"
                  max={3}
                  defaultValue={0}
                  min={0}
                  placeholder="number of stops"
                  {...methods.register("stops")}
                />
                <p className="error">{errors.stops?.message}</p>

              </div>
              <div class="input__field">
                <p>
                  <i class="fa-solid fa-star-of-life"></i> Amount
                </p>
                <input
                  type="text"
                  placeholder="27500"
                  {...methods.register("amount")}
                />
                <p className="error">{errors.amount?.message}</p>

              </div>
            </div>
          </div>
          <div class="registration__row">
          <div class="reg__second reg__third">
            <div className="input__field">
                <p>
                  <i className="fa-solid fa-star-of-life"></i> Flight Number
                </p>
                <input
                  type="text"
                 
                  placeholder="eg: SG35"
                  {...methods.register("flight_number")}
                />
                <p className="error">{errors.flight_number?.message}</p>

              </div>
            <div className="input__field">
            <p>
              <i className="fa-solid fa-star-of-life"></i> Check in Baggage
            </p>
            <input
              type="number"
              max={70}
              defaultValue={30}
              min={0}
              placeholder="check in baggage"
              {...methods.register("checkin_baggage")}
            />
            <p className="error">{errors.checkin_baggage?.message}</p>

          </div>
            <div className="input__field">
            <p>
              <i className="fa-solid fa-star-of-life"></i> Cabin Baggage
            </p>
            <input
              type="number"
              max={15}
              defaultValue={7}
              min={0}
              placeholder="cabin baggage"
              {...methods.register("cabin_baggage")}
            />
            <p className="error">{errors.cabin_baggage?.message}</p>

          </div>

            </div>
            <div class="reg__second ">
            
              <div class="input__field">
                <p>Contact Number</p>
                <input
                  type="text"
                  placeholder="989579859"
                  {...methods.register("phone")}
                />
                <p className="error">{errors.phone?.message}</p>

              </div>
              <div class="input__field">
                <p>E-Mail</p>
                <input
                  type="text"
                  placeholder="Sample@gmail.com"
                  {...methods.register("mail")}
                />
                <p className="error">{errors.mail?.message}</p>

              </div>
            </div>
            
          </div>
          <div class="registration__row">
            <div class="reg__first notes">
              <div class="input__field">
                <p>Notes</p>
                <textarea {...methods.register("notes")}></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="registration__footer">
          <div class="registration__confirm">
            <button class="goback" type="submit">
              Go back
            </button>
            <button class="create">Create </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default SellTicket;
