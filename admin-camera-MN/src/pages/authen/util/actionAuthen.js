import { useHistory } from "react-router-dom";
import instance from "../../../api/instance";

export const checkTokenSignin=async()=>{
        try {
            const res = await instance.request({
                url: "/user/checktoken",
                method: "POST",
                data:{token:localStorage.getItem('token')}
            })
            localStorage.setItem('isvalue',res.data.success)
            return res.data.success;
        } catch (error) {
            console.log(error);
        }
    }
