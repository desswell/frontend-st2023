import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import axios from "axios";
import {useNavigate} from "react-router-dom";
let websocket = new WebSocket('ws://localhost:9000/websockets')
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
export function AllRequestsDefinitePage() {
    const params = useParams()
    const [data, setData] = useState()
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState('')
    const [changeStatus, setChangeStatus] = useState('')
    const navigate = useNavigate()
    const HandleClick = () => {
        websocket.onopen = () => {
            websocket.send(JSON.stringify({
                "login": userData.username
            }))
        }
        console.log('success')
        websocket.send(JSON.stringify({
            "id": parseInt(params.id),
            "id_user": status.id_user,
            "id_service": status.id_service,
            "status": changeStatus
        }))
        navigate("/main")
    }
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
                    <label>
                        <input className="definiteService-input-con-label definiteService-input definiteService-input-plus" placeholder="Введите новый статус..." onChange={(event) => {setChangeStatus(event.target.value)}}/>
                        <button className="definiteService-button definiteService-button-plus" onClick={(e) => {
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