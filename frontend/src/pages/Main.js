import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import LeftHeader from "../components/LeftHeader";
import TopHeader from "../components/TopHeader";
import Footer from '../components/Footer';

const Main = () => {
  return (
    <div className="main__container">
      <TopHeader />
      <div className="main">
      <LeftHeader />
      <div className="information__container">
        <Outlet />
      </div>
      </div>
      <Footer />

    </div>
  );
};

export default Main;
