/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const dashboard = [
    <i class="fa-solid fa-house" style={{color:`${color}`}}></i>
  ];
  const camera = [
    <i className=" fa-solid fa-camera " style={{color:`${color}`}}></i>,
  ];

 
  const profile = [
    <i class="fa-solid fa-user"  style={{color:`${color}`}}></i>
  ];

  

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Muse Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/home">
          <span
              className="icon"
            
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
          
        </Menu.Item>
        <Menu.Item key="2">
        <NavLink to="/camera">
            <span
              className="icon"
             
            >
              {camera}
            </span>
            <span className="label">camera</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              
            >
              {profile}
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      <div className="aside-footer">
        <div
          className="footer-box"
          style={{
            background: color,
          }}
        >
          <span className="icon" style={{ color:color }}>
            {dashboard}
          </span>
          <h6>Need Help?</h6>
          <p>Please check our docs</p>
          <Button type="primary" className="ant-btn-sm ant-btn-block">
            DOCUMENTATION
          </Button>
        </div>
      </div>
    </>
  );
}

export default Sidenav;
