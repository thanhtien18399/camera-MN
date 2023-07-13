import { Redirect, Route } from "react-router-dom"
import { checkTokenSignin } from "../pages/authen/util/actionAuthen"


const createRoute = (condition) => {
    return  (props) => {
        const {path,component,redirectComp}=props
        if ( condition()) {
            return <Route path={path} component={component}/> 
            
        }
        return <Redirect to={redirectComp}/>
    }
}


const checkAuth = () => {
    const token = localStorage.getItem('token');
    const isvalue =localStorage.getItem('isvalue');

    console.log("auth",token,isvalue);
    if (!token) {
            return true;
    }
    if(isvalue==='false'){
        return true;
    }
    return false;
    
};

// setInterval(() => {
//     checkTokenSignin();
// }, 3000);
const checkLogin = () => {
    checkTokenSignin();
    var isvalue =localStorage.getItem('isvalue');
    console.log('login',isvalue);
    if (isvalue==="true") {
        return true;
    }
    return false;
};
export const AuthRoute = createRoute(checkAuth)

export const PrivateRoute = createRoute(checkLogin)




