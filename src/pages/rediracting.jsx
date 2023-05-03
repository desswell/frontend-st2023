import React, {useNavigate} from 'react-router-dom'
import {useEffect} from "react";
export function Rediracting(){
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/sighIn')
    })
    return(
        <div>
        </div>
    )
}