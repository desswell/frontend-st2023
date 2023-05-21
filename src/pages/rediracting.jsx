import React, {useNavigate} from 'react-router-dom'
import {useEffect} from "react";
export function Rediracting(){
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('login')){
            navigate('/main')
        } else {
            navigate('/sighin')
        }
    })
    return(
        <div>
        </div>
    )
}