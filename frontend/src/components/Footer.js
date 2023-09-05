import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
     <div className="footer">
    <div className="footer__inner">
        <div className="footer__logo"><img src="/Res/logo.png" alt=""></img></div>
        <div className="footer__visa">
            <h3>Visa's</h3>
            <NavLink to="/create-visastambing" >
                <p>Add visa</p>
            </NavLink>
            <NavLink to="/create-visastambing" >
                <p>Add E-visa</p>
            </NavLink>
            <NavLink to="/create-attastation" >
                <p>Add Attastation</p>
            </NavLink>
            <NavLink to="/visas" >
                <p>Visa Applications</p>
            </NavLink>
            <NavLink to="/attastations" >
                <p>Attastations</p>
            </NavLink>
        </div>
        <div className="footer__passport">
            <h3>Appoinments</h3>
            <NavLink to="create-appoinment" >
                <p>Add Appoinment</p>
            </NavLink>
            <NavLink to="/smart-tools" >
                <p>Annexers creation</p>
            </NavLink>
        
            <NavLink to="/appoinments" >
                <p>Appoinments</p>
            </NavLink>
           
        </div>
        <div className="footer__ticket">
            <h3>Tickets</h3>
            <NavLink to="create-ticket" >
                <p>Add Ticket</p>
            </NavLink>
            <NavLink to="create-ticket-request" >
                <p>Add Ticket  Request</p>
            </NavLink>
            <NavLink to="sell-ticket" >
                <p>Sell Your Ticket</p>
            </NavLink>
            <NavLink to="/tickets" >
                <p>Tickets</p>
            </NavLink>
            <NavLink to="ticket-requests" >
                <p>Ticket Requests</p>
            </NavLink>
            <NavLink to="/ticket-market" >
                <p>Ticket Market</p>
            </NavLink>
        </div>

        <div className="footer__transactions">
            <h3>More</h3>
            <NavLink to="create-transaction" >
                <p>Add Transaction </p>
            </NavLink>
            <NavLink to="/create-agency" >
                <p>Agency creation</p>
            </NavLink>
            <NavLink to="/smart-tools" >
                <p>Generate Invoice</p>
            </NavLink>
            <NavLink to="/smart-tools" >
                <p>Passport Extraction</p>
            </NavLink>
            <NavLink to="/transactions" >
                <p>Transactions</p>
            </NavLink>
            <NavLink to="/update-agency" >
                <p>Your Agencies</p>
            </NavLink>
        </div>
        <div className="footer__about">
            <h3>Company</h3>
            <NavLink to="about" >
                <p>About </p>
            </NavLink>
            <NavLink to="help-center" >
                <p>Help Center</p>
            </NavLink>
            <NavLink to="support" >
                <p>Chat support</p>
            </NavLink>
            <NavLink to="contact" >
                <p>Contact</p>
            </NavLink>
        </div>

    </div>

    <div className="social__and__copyright">

        <div className="translation">
            <select name="" id="">
                <option value="">English</option>
                <option value="">Malayalam</option>

            </select>
        </div>

        <div className="copyright">
            Copyright <i className="fa-regular fa-copyright"></i> 2023 mina travels valluvambram

        </div>
        <div className="social__icons nowrap">
            <a href="https:/www.linkedin.com/company/mina-assist" ><i className="fa-brands fa-linkedin"></i></a>
            <a href='tel:+918606544874' ><i className="fa-brands fa-square-call"></i> </a>
            <a href='' ><i className="fa-brands fa-facebook"></i></a>
        </div>
    </div>


</div>
  )
}

export default Footer