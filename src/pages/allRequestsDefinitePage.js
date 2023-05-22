import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import axios from "axios";

export function AllRequestsDefinitePage() {
    const params = useParams()
    const [data, setData] = useState()
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState('')
    useEffect(() => {
        async function fetchService () {
            await axios.get(`http://127.0.0.1:8000/zayavkipolz/${params.id}`).then((resp) => {
                setStatus(resp.data)
            })
        }
        fetchService().then(() => {
        })
    }, [setStatus])
    useEffect(() => {
        if (status) {
            async function fetchData() {
                await axios.get(`http://127.0.0.1:8000/uslugi/${status.id_service}`).then((resp) => {
                    setData(resp.data)
                })
                await axios.get(`http://127.0.0.1:8000/polzovateli/${status.id_user}`).then((resp) => {
                    setUserData(resp.data)
                })
            }

            fetchData().then(() => {
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
                        <input type='number' value={userData.passport ? userData.passport : 12} className='definiteService-input'/>
                        <span className='definiteService-input-description'>
                          Серия и номер паспорта
                    </span>
                    </label>
                    <label className='definiteService-input-con-label'>
                        <input type='number' value={userData.snils ? userData.snils : 123} className='definiteService-input'/>
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