import React, { useState, useContext, useEffect } from "react";
import BroughtResult from "./BroughtResult";
import AirportSelect from "../AirportSelect";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { created, errorOccured } from "../../utlties/Toastes";
import BroughtTicketEnlarged from "./BroughtTicketEnlarged";

const BroughtTicket = () => {
  let dates = [];
  for (let i = 1; i < 31; i++) {
    let tempDate = new Date();

    tempDate.setDate(tempDate.getDate() + i);
    dates.push(tempDate);
  }
  const { getHeaders } = useContext(AuthContext);
  const methods = useForm();
  const [origin, setOrigin] = useState("");
  const [sertchTrigger, setSearchTrigger] = useState(false);
  const [destination, setDestination] = useState("");
  const [flights, setFlights] = useState([]);
  const [date, setDate] = useState("");
  const [broughtTicketEnlarger, setBroughtTicketEnlarger] = useState([]);
  const searchFlight = () => {
    axios
      .get(
        `/api/get-ticket-on-sales?origin=${origin}&destination=${destination}&date=${date}`,
        getHeaders
      )
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          setFlights(res.data);
        }
      })
      .catch((err) => {
        errorOccured();
      });
  };

  useEffect(() => {
    searchFlight();
  }, [date, sertchTrigger]);

  const handleSubmit = (data) => {
    setOrigin(data.depature_port ? data.depature_port : "");
    setDestination(data.arrival_port ? data.arrival_port : "");
    setDate(data["date"]);
    setSearchTrigger((prev) => !prev);
    console.log(data);
  };
  function rightSlide() {
    document.getElementById("special__date__picker").scrollLeft += 30;
  }
  function leftSlide() {
    document.getElementById("special__date__picker").scrollLeft -= 30;
  }
  const changeSpecialDate = (d,e) => {
  const  special__dates=document.getElementsByClassName("special__date")
    
    setDate(d.toISOString().substring(0, 10));
    searchFlight();
  };
  const getBroughtTicket = (pk) => {
    axios
      .get(`/api/get-ticket-on-sale/${pk}`, getHeaders)
      .then((res) => {
        setBroughtTicketEnlarger(res.data);
        let block = document.getElementById("enlarger__outer__layer1");
        block.style.display = "block";
      })
      .catch((err) => {
        errorOccured();
      });
  };
  return (
    <FormProvider {...methods}>
      <div>
        <div className="special__date__picker__container">
          <div className="date__scroll">
            <i
              className="fa-solid fa-chevron-left"
              id="slideLeft"
              onClick={leftSlide}
            >
              
            </i>
          </div>
          <div className="special__date__picker" id="special__date__picker">
            {dates.map((dt) => (
              <div
              key={dt}
                className="special__date"
                onClick={(e) => changeSpecialDate(dt,e)}
              >
                <p classNameName="day"></p>
                <p className="day">{dt.toDateString()?.substring(0, 3)}</p>
                <p className="date">{dt.getUTCDate()}</p>
              </div>
            ))}
          </div>
          <div className="date__scroll" id="slideRight">
            <i className="fa-solid fa-chevron-right" onClick={rightSlide}>
              
            </i>
          </div>
        </div>
        <div className="flight__container">
          <div className="flight__search__header">
            <div className="flight__search__input">
              <p>
                {" "}
                <i className="fa-solid fa-plane-departure"></i>{" "}
              </p>
              <AirportSelect registerName={{ Name: "depature_port" }} />
            </div>
            <div className="flight__search__input">
              <p>
                <i className="fa-solid fa-plane-arrival"></i>
              </p>
              <AirportSelect registerName={{ Name: "arrival_port" }} />
            </div>
            <div className="flight__search__input">
              <p>
                <i className="fa-solid fa-calendar-days"></i>
              </p>
              <input
                type="date"
                name=""
                defaultValue={date}
                {...methods.register("date")}
              />
            </div>
            <div
              className="flight__search__button"
              onClick={methods.handleSubmit(handleSubmit)}
            >
              <i className="fa-solid fa-magnifying-glass"></i> &nbsp; search
            </div>
          </div>
          <div className="flight__search__results">
            {flights.map((result) => {
              return (
                <BroughtResult
                  data={result}
                  getBroughtTicket={getBroughtTicket}
                />
              );
            })}
          </div>
        </div>
      </div>

      <BroughtTicketEnlarged data={broughtTicketEnlarger} />
    </FormProvider>
  );
};

export default BroughtTicket;
