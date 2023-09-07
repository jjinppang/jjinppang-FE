// import { useNavigate } from "react-router-dom";
import { setCookie } from "../cookies/Cookie";
import React, { useEffect } from "react";

function Redirection() {
    
    useEffect(() => {
        const url = new URL(window.location.href);
        const getAccessToken = url.searchParams.get('accesstoken');
        const getRefreshToken = url.searchParams.get('refreshtoken');
        const error = url.searchParams.get('error');

        if (getAccessToken && getRefreshToken ) {
            setCookie('accesstoken', getAccessToken);
            setCookie('refreshtoken', getRefreshToken);
            window.location.href = 'http://localhost:3000/main'
            // alert('로그인 성공했습니다.')
        } 
        else {
            alert(error)
        }
        alert('로그인 성공했습니다.')
           
    },[]);




    return (
        <>

        </>
    )
}

export default Redirection