import { useNavigate } from "react-router-dom";
import { setCookie } from "../cookies/Cookie";
import React, { useEffect } from "react";

function Redirection() {
    const navigate = useNavigate();
    

    useEffect(() => {
        const url = new URL(window.location.href);
        const getAccessToken = url.searchParams.get('accesstoken');
        const getRefreshToken = url.searchParams.get('refreshtoken');
        const error = url.searchParams.get('error');

        if (getAccessToken && getRefreshToken ) {
            setCookie('ACCESS_TOKEN', getAccessToken);
            setCookie('REFRESH_TOKEN', getRefreshToken);
            window.location.href = 'http://localhost:3000/main'
            navigate('/main');
        } 
        else {
            alert(error)
        }
           
    },[]);




    return (
        <>

        </>
    )
}

export default Redirection