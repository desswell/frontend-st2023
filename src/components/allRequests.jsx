import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

export function AllRequestsMap(Props){
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
    }, [setRequest])
    useEffect(() => {
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
                             onClick={() => navigate(`/allRequestsDefinitePage/${Props.Props.id}`)}>
                <p className='profile-requests-text'>
                    №Заявки {Props.Props.id}. Заявка на услугу: {request.name}. Статус - { status } </p>
            </div>}
        </div>
    )

}