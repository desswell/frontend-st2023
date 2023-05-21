import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

export function MyRequests(Props){
    const navigate = useNavigate()
    const [request, setRequest] = useState()
    const [status, setStatus] = useState('')
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/uslugi/${Props.Props.id_service}`,{method : "GET"})
            .then((res) => res.json())
            .then((data) => {
                    setRequest(data)
                }
            );
        if (Props.Props.status === 'accepted') {
            setStatus('Принята')
        } else if (Props.Props.status === 'discard'){
            setStatus('Отклонена')
        } else {
            setStatus('В рассмотрении')
        }
    }, [setRequest])

    return(
        <div>
            {request && <div className=''
                  onClick={() => navigate(`/profile/myRequests/${Props.Props.id}`)}>
                <p className='profile-requests-text'>
                    Заявка на услугу: {request.name}. Статус - { status }</p>
            </div>}
        </div>
    )

}