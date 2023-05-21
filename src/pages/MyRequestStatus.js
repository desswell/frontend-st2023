import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import axios from "axios";
import {useUserData} from "../store_redux/slices/services";

export function MyRequestStatus() {
    const params = useParams()
    const [data, setData] = useState()
    const userData = useUserData()
    const id = userData[0].id
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchService () {
            await axios.get(`http://127.0.0.1:8000/zayavkipolz/?id_user=${id}&id_service=${params.id}`).then((resp) => {
                setStatus(resp.data)
            })
            await axios.get(`http://127.0.0.1:8000/uslugi/${params.id}`).then((resp) => {
                setData(resp.data)
            })
        }
        fetchService().then(() => {
            setLoading(false)
        })
    }, [setData])

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
                        <input type='number' value={123} className='definiteService-input'/>
                        <span className='definiteService-input-description'>
                          Серия и номер паспорта
                    </span>
                    </label>
                    <label className='definiteService-input-con-label'>
                        <input type='number' value={123} className='definiteService-input'/>
                        <span className='definiteService-input-description'>
                         СНИЛС
                    </span>
                    </label>
                    <label className='definiteService-status'>
                        Статус - { status[0].status === 'accepted' ? 'Принята' : status[0].status === 'discard' ? 'Отклонена' : 'В рассмотрении' }
                    </label>
                </form>
            </div>
            }
        </div>
    )
}