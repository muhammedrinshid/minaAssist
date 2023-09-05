import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import AuthContext from "../context/AuthContext";
import UpdaeProfile from "../pages/Main/updates/UpdaeProfile";
import UpdateConfirm from "./model form/UpdateConfirm";

const TopHeader = () => {

  const [userDet, setUserDet] = useState(false);
  const { user, logoutUser,domainName } = useContext(AuthContext);
  console.log(domainName)

  const [profileUpdate,setProfileUpdate]=useState({
    visibility:false,
    profileData:{

    },
    confirm:false,
    
  })

  const openHeader = () => {
    let MobileHeader = document.getElementById("mobile__header");

    MobileHeader.style.right = "0";
  };
  const closeHeader = () => {
    let MobileHeader = document.getElementById("mobile__header");
    MobileHeader.style.right = "-290px";
  };
 const user__details__con=(n)=>{
    let det=document.getElementById("user__details")
    let but=document.getElementById("up__down")



        
    det.classList.toggle("isopen")
    if (n===1) {
      but.classList.toggle("close")

    }else{
      but.classList.toggle("isopen")
    }

    
 }
const openUpdateProfile=()=>{
  setProfileUpdate((prev)=>{
    return {...prev,visibility:true}
  })
}
  return (
    <header className="header">
      <div className="header__logo__container">
        <img  src={logo} width="160px" alt=""></img>
      </div>
      <div className="header__links">
        <div className="header__link">
          <NavLink
            className={({ isActive }) => (isActive ? "active__link" : null)}
            to="appoinments"
          >
            <p>Appoinments</p>
          </NavLink>
        </div>
        <div className="header__link">
          <NavLink
            className={({ isActive }) => (isActive ? "active__link" : null)}
            to="visas"
          >
            <p>Visa's</p>
          </NavLink>
        </div>
        <div className="header__link">
          <NavLink
            className={({ isActive }) => (isActive ? "active__link" : null)}
            to="tickets"
          >
            <p>Tickets</p>
          </NavLink>
        </div>
        <div className="header__link">
          <NavLink
            className={({ isActive }) => (isActive ? "active__link" : null)}
            to="transactions"
          >
            <p>Transactions</p>
          </NavLink>
        </div>
        <div className="header__link">
          <NavLink
            className={({ isActive }) => (isActive ? "active__link" : null)}
            to="ticket-requests"
          >
            <p>Ticket Requests</p>
          </NavLink>
        </div>
        <div className="header__link">
          <NavLink
            className={({ isActive }) => (isActive ? "active__link" : null)}
            to="ticket-market"
          >
            <p>Ticket Market</p>
          </NavLink>
        </div>
        <div className="header__link">
          <NavLink
            className={({ isActive }) => (isActive ? "active__link" : null)}
            to="attastations"
          >
            <p>Attastations</p>
          </NavLink>
        </div>
        <div className="header__link">
          <NavLink
            className={({ isActive }) => (isActive ? "active__link" : null)}
            to="smart-tools"
          >
            <p>Smart Tools</p>
          </NavLink>
        </div>
      </div>
      <div className="user">
        <img src={user?.image} alt=""/>
        <div className="user__name">
          <p className="nowrap" onClick={() => setUserDet((prev) => !prev)}>
            {user?.agency}
            <ion-icon
              class={userDet ? "close" : null}
              name="caret-down-outline"
              id="up__down"
            >f</ion-icon>
          </p>
        </div>
        {userDet && (
          <div className="user__details" >
            <div className="user__details__child">
              <p className="nowrap" onClick={()=>openUpdateProfile()}>
                <i className="fa-solid fa-user-pen"></i> &nbsp; Edit profile
              </p>
              <p className="nowrap">
                <i className="fa-solid fa-gear"></i> &nbsp; Preferences
              </p>
            </div>
            <div className="user__details__child">
              <p className="nowrap">
                <i className="fa-solid fa-moon"></i>&nbsp; Night Mode
              </p>
            </div>
            <div className="user__details__child">
              <p className="nowrap">
                <ion-icon name="add-circle"></ion-icon> &nbsp; Gro Pro
              </p>
              <p className="nowrap">
                <i className="fa-solid fa-question"></i> &nbsp; Help Center
              </p>
            </div>
            <div className="user__details__child">
              <p onClick={logoutUser} className="nowrap">
                <i className="fa-solid fa-right-from-bracket"></i> &nbsp; Sign
                Out
              </p>
            </div>
          </div>
        )}
      </div>
      <div class="menu__icon">
        <ion-icon name="menu-outline" onClick={() => openHeader()}>
          
        </ion-icon>
      </div>

      <div class="mobile__header" id="mobile__header">
        <div class="mobile__header__header">
          <ion-icon
            name="close-outline"
            class="close__icon"
            onClick={() => closeHeader()}
          >
            x
          </ion-icon>
          <p onClick={()=>user__details__con(1)}>
           {user?.agency+" "+user?.branch}{" "}
            <ion-icon name="caret-down-outline" id="up__down"></ion-icon>
          </p>
          <img src="/Res/user.jpg" alt="" class="user__image" />
        </div>
        <div class="user__details" id="user__details" onClick={()=>user__details__con(0)}>
          <div class="user__details__child">
            <p class="nowrap">
              <i class="fa-solid fa-user-pen"></i> &nbsp; Edit profile
            </p>
            <p class="nowrap">
              <i class="fa-solid fa-gear"></i> &nbsp; Preferences
            </p>
          </div>
          <div class="user__details__child">
            <p class="nowrap">
              <i class="fa-solid fa-moon"></i>&nbsp; Night Mode
            </p>
          </div>
          <div class="user__details__child">
            <p class="nowrap">
              <ion-icon name="add-circle"></ion-icon> &nbsp; Gro Pro
            </p>
            <p class="nowrap">
              <i class="fa-solid fa-question"></i> &nbsp; Help Center
            </p>
          </div>
          <div class="user__details__child">
            <p class="nowrap" onClick={logoutUser}>
              <i class="fa-solid fa-right-from-bracket"></i> &nbsp; Sign Out
            </p>
          </div>
        </div>
        <div class="mobile__header__links">
          <div class="mobile__header__link">
            <NavLink className={({ isActive }) => (isActive ? "active__link" : null)} to={"/appoinments"}>Appoinments</NavLink>
          </div>
          <div class="mobile__header__link">
            <NavLink className={({ isActive }) => (isActive ? "active__link" : null)} to={"/visas"}>Visa's</NavLink>
          </div>

          <div class="mobile__header__link">
            <NavLink className={({ isActive }) => (isActive ? "active__link" : null)} to={"/tickets"}>Tickets</NavLink>
          </div>
         
          <div class="mobile__header__link">
            <NavLink className={({ isActive }) => (isActive ? "active__link" : null)} to={"/transactions"}>Transactions</NavLink>
          </div>
        

          <div class="mobile__header__link">
            <NavLink className={({ isActive }) => (isActive ? "active__link" : null)} to={"/ticket-requests"}>Ticket Requests</NavLink>
          </div>
          <div class="mobile__header__link">
            <NavLink className={({ isActive }) => (isActive ? "active__link" : null)} to={"ticket-market"}>Ticket Marcket</NavLink>
          </div>
          <div class="mobile__header__link">
          <NavLink className={({ isActive }) => (isActive ? "active__link" : null)} to={"/attastations"}>Attastations</NavLink>
        </div>
          <div class="mobile__header__link">
            <NavLink className={({ isActive }) => (isActive ? "active__link" : null)} to={"/smart-tools"}>SmartTools</NavLink>
          </div>
        </div>
      </div>
      {profileUpdate.visibility&&(
        <div className="pop__container special">   
        {profileUpdate.confirm?(<UpdateConfirm profileUpdate={profileUpdate} setProfileUpdate={setProfileUpdate}/>):(<UpdaeProfile profileUpdate={profileUpdate} setProfileUpdate={setProfileUpdate}/>
        )}
        
        </div>
      )}
    </header>
  );
};

export default TopHeader;
