import React from 'react'

import { NavLink,  } from "react-router-dom";


const LeftHeader = () => {
  return (
    <div className="navigation" id="nav">
                <div className="navigation__inner">
                    <ul>

                        <li >
                            <NavLink href="">
                                <span className=" "></span>
                                <span className="icon "><ion-icon  name="grid"></ion-icon></span>

                                <span> </span>
                            </NavLink>
                        </li>

                        <li  >
                           <NavLink className={({isActive})=>isActive?"hovered":null} to="/"   >
                                  <span className="icon"><ion-icon name="home"></ion-icon></span>
                                <span className="title">Dashboard</span>
                             


                            </NavLink>
                            
                        </li>

                        <li>
                            <NavLink className={({isActive})=>isActive?"hovered":null} to="create-appoinment">
                                <span className="icon"><ion-icon name="alarm"></ion-icon></span>
                                <span className="title">Add Appoinment</span>
                                <span className="add__icon"><ion-icon name="add-circle"></ion-icon></span>

                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={({isActive})=>isActive?"hovered":null} to="create-visastambing">
                                <span className="icon"><ion-icon name="file-tray-stacked"></ion-icon></span>
                                <span className="title">Visa Stambing</span>
                                <span className="add__icon"><ion-icon name="add-circle"></ion-icon></span>

                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={({isActive})=>isActive?"hovered":null} to="create-ticket">
                                <span className="icon"><ion-icon name="airplane"></ion-icon></span>
                                <span className="title">Ticket</span>
                                <span className="add__icon"><ion-icon name="add-circle"></ion-icon></span>

                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={({isActive})=>isActive?"hovered":null} to="create-transaction">
                                <span className="icon"><ion-icon name="cash"></ion-icon></span>
                                <span className="title">Transaction</span>
                                <span className="add__icon"><ion-icon name="add-circle"></ion-icon></span>

                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={({isActive})=>isActive?"hovered":null} to="sell-ticket">
                                <span className="icon"><ion-icon name="globe"></ion-icon></span>
                                <span className="title">Sell Ticket</span>
                                <span className="add__icon"><ion-icon name="add-circle"></ion-icon></span>

                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={({isActive})=>isActive?"hovered":null} to="create-attastation">
                                <span className="icon"><ion-icon name="document-attach"></ion-icon></span>
                                <span className="title"> Attastation</span>
                                <span className="add__icon"><ion-icon name="add-circle"></ion-icon></span>

                            </NavLink>
                        </li>

                        <li>
                            <NavLink className={({isActive})=>isActive?"hovered":null} to="create-agency">
                                <span className="icon"><ion-icon name="business"></ion-icon></span>
                                <span className="title">Agency creation </span>
                                <span className="add__icon"><ion-icon name="add-circle"></ion-icon></span>

                            </NavLink>
                        </li>
                        <li>
                            
                        </li>


                        <li>
                            <NavLink className={({isActive})=>isActive?"hovered":null} to="create-ticket-request">
                                <span className="icon"><ion-icon name="pricetags"></ion-icon></span>
                                <span className="title">Ticket Request</span>
                                <span className="add__icon"><ion-icon name="add-circle"></ion-icon></span>

                            </NavLink>
                            <NavLink className={({isActive})=>isActive?"hovered":null} to="update-agency">
                                <span className="icon"><ion-icon name="library-outline"></ion-icon></span>
                                <span className="title">Manage Agency</span>
                                <span className="add__icon"><ion-icon name="add-circle"></ion-icon></span>

                            </NavLink>
                        </li>
                    </ul>
                </div>


            </div>
  )
}

export default LeftHeader