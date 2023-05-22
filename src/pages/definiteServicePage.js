import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import axios from "axios";
import { useUserData } from "../store_redux/slices/services";
import {useNavigate} from "react-router-dom";

export function DefiniteServicePage() {
    const params = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const userData = useUserData()[0]
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchService () {
            await axios.get(`http://127.0.0.1:8000/uslugi/${params.id}`).then((resp) => {
                setData(resp.data)
            })
        }
        fetchService().then(() => setLoading(false))
    }, [setData])
    const HandleClick = () => {
        axios.post('/api/addZay', {
            "id_user": userData.id, "id_service": params.id, "status": "consideration"
        }).then(r => {
            navigate('/main')
        })
    }
    return(<div>
        { !loading && <div>
        <p className="definiteService-title">
            Заявка на услугу «{data.name}»
        </p>
        <p className='definiteService-container'>
            {data.description}
        </p>
        <form className='definiteService-input-con'>
            <label className='definiteService-input-con-label'>
                <input type='number' value={userData.passport} className='definiteService-input'/>
                <span className='definiteService-input-description'>
                          Серия и номер паспорта
                    </span>
            </label>
            <label className='definiteService-input-con-label'>
                <input type='number' value={userData.snils} className='definiteService-input'/>
                <span className='definiteService-input-description'>
                         СНИЛС
                    </span>
            </label>
            <label className='definiteService-input-con-label definiteService-input-checkbox-text'>
                <input type='checkbox' required={true}/>
                <span className='definiteService-input-checkbox'>Согласен(а) на обработку персональных данных</span>
            </label>
            <label className='definiteService-input-con-label'>
                <button className='definiteService-button' onClick={(e) => {
                    e.preventDefault()
                    HandleClick()
                }}>Отправить</button>
            </label>
        </form>
    </div>
}
        </div>
    )
}