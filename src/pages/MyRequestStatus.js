import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import axios from "axios";
import {useUserData} from "../store_redux/slices/services";

export function MyRequestStatus() {
    const params = useParams()
    const [data, setData] = useState()
    const userData = useUserData()[0]
    const empty = 0
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchService () {
            await axios.get(`http://127.0.0.1:8000/zayavkipolz/${params.id}`).then((resp) => {
                setStatus(resp.data)
            })
        }
        fetchService().then(() => {

        })
    }, [setData])
    useEffect(() => {
        if (status) {
            axios.get(`http://127.0.0.1:8000/uslugi/${status.id_service}`).then((resp) => {
                setData(resp.data)
            }).then(() => {
                setLoading(false)
            })
        }
    }, [status])
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
                        <input type='text' value={userData.passport !== null ? userData.passport : empty} className='definiteService-input'/>
                        <span className='definiteService-input-description'>
                          Серия и номер паспорта
                    </span>
                    </label>
                    <label className='definiteService-input-con-label'>
                        <input type='text' value={userData.snils !== null ? userData.snils : empty} className='definiteService-input'/>
                        <span className='definiteService-input-description'>
                         СНИЛС
                    </span>
                    </label>
                    <label className='definiteService-status'>
                        Статус - { status.status === 'accepted' ? 'Принята' : status.status === 'discard' ? 'Отклонена' : 'В рассмотрении' }
                    </label>
                </form>
            </div>
            }
        </div>
    )
}