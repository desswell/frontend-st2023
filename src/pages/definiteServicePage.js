import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
import axios from "axios";

export function DefiniteServicePage() {
    const params = useParams()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchService () {
            await axios.get(`http://127.0.0.1:8000/uslugi/${params.id}`).then((resp) => {
                setData(resp.data)
            })
        }
        fetchService().then(() => setLoading(false))
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
                <input type='number' placeholder='Введите ваш паспорт' className='definiteService-input'/>
                <span className='definiteService-input-description'>
                          Серия и номер паспорта
                    </span>
            </label>
            <label className='definiteService-input-con-label'>
                <input type='number' placeholder='Введите ваш СНИЛС' className='definiteService-input'/>
                <span className='definiteService-input-description'>
                         СНИЛС
                    </span>
            </label>
            <label className='definiteService-input-con-label definiteService-input-checkbox-text'>
                <input type='checkbox' required={true}/>
                <span className='definiteService-input-checkbox'>Согласен(а) на обработку персональных данных</span>
            </label>
            <label className='definiteService-input-con-label'>
                <button className='definiteService-button'>Отправить</button>
            </label>
        </form>
    </div>
}
        </div>
    )
}