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
import { Switch, Route, Redirect ,BrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SignIn from "../pages/authen/Signin/index";
import Camera from "../pages/Camera/index";
import Main from "../components/layout/Main";
import "antd/dist/antd.css";
import "../assets/styles/main.css";
import "../assets/styles/responsive.css";
import { AuthRoute, PrivateRoute } from "./guard";
import { checkTokenSignin } from "../pages/authen/util/actionAuthen";
import { useEffect, useState } from "react";

function App() {
  const [token,setToken]=useState(localStorage.getItem('isvalue'))
  const checktoken = async()=>{
   let res= await checkTokenSignin();
   setToken(res);
  }
  useEffect(()=>{
    checktoken();
    console.log("check",token);
  },[token])
  return (
     <div className="App">
      <Switch>
        {/* <Route path="/sign-up" exact component={SignUp} /> */}
        <AuthRoute path="/sign-in"   component={SignIn}  redirectPath="/home"/>
       
        <Main >
       
        <PrivateRoute exact  path="/home" component={Home} redirectComp="/sign-in"  />
        <PrivateRoute  path="/camera" component={Camera}  redirectComp="/sign-in"/>
        <PrivateRoute  path="/profile" component={Profile} redirectComp="/sign-in"/>
        <Redirect from="*"  to="/home" />
        </Main>
        
        
      </Switch>
    </div>   
  );
}

export default App;
