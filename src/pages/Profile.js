import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { ReactComponent as Reactedit} from "../img/edit.svg";
import {useUserData} from "../store_redux/slices/services";
import axios from "axios";

export function Profile(){
    const [profile, setProfile] = useState(null)
    const userData = useUserData()[0]
    useEffect(() => {
        setProfile(userData)
    }, [userData])
    const empty = 'Пусто'
    const navigate = useNavigate()
    const [passport, setPassport] = useState('')
    const [passport_code, setPassport_code] = useState('')
    const [passport_whom, setPassport_whom] = useState('')
    const [passport_data, setPassport_data] = useState('')
    const [changePassport, setChangePassport] = useState(false)
    const [inn, setInn] = useState('')
    const [changeInn, setChangeInn] = useState(false)
    const [snils, setSnils] = useState('')
    const [changeSnils, setChangeSnils] = useState(false)
    if (!userData){
        navigate('/sighIn')
    }
    const HandleClickLogout = () => {
        axios.get('http://127.0.0.1:8000/api/logout').then(r => {
            localStorage.removeItem('login')
            window.location.reload()
        })
    }
    const HandleClickPassport = () => {
        axios.post(`/api/passCh/${userData.id}`, {
            "passport": passport, "passport_code": passport_code, "passport_whom": passport_whom, "passport_data": passport_data
        }).then((res) => {
            setChangePassport((prev) => !prev)
            return res
        }).then(() => {
            window.location.reload()
        })
    }
    const HandleClickSnils = () => {
        axios.post(`/api/snilsCh/${userData.id}`, {
            "snils": snils
        }).then((res) => {
            setChangeSnils((prev) => !prev)
            return res
        }).then(() => {
            window.location.reload()
        })
    }
    const HandleClickInn = () => {
        axios.post(`/api/innCh/${userData.id}`, {
            "inn": inn
        }).then((res) => {
            setChangeInn((prev) => !prev)
            return res
        }).then(() => {
            window.location.reload()
        })
    }
    return(<div>
            {profile && <div className='profile-div'>
                <p className="profile-title">
                    Профиль
                </p>
                <ul className='profile-menu'>
                    <Link to="/profile" className="profile-menu-active">Данные и документы</Link>
                    <Link to='/profile/myrequests' className="profile-menu-disable">Мои заявки</Link>
                </ul>
                <form>
                    <label className='profile-info'>
                    <span className="profile-sub-title">
                        Паспорт
                        {!changePassport && <button className='profile-edit-icon' onClick={(e) => {
                            e.preventDefault()
                            setChangePassport((prev) => !prev)
                        }}><Reactedit/></button>}
                        {changePassport && <button className='profile-edit-icon' onClick={(e) => {
                            e.preventDefault()
                            HandleClickPassport()
                        }}><Reactedit/></button>}
                    </span>
                        {!changePassport && <p className='profile-info-text'>{profile.passport ? profile.passport : empty}</p>}
                        {changePassport && <input className='profile-info-text-input' required={true} onChange={(event) => setPassport(event.target.value) }/>}
                        <p className='profile-info-description'>
                            Серия и номер
                        </p>
                        {!changePassport && <p className='profile-info-text'>{profile.passport_whom ? profile.passport_whom : empty}</p>}
                        {changePassport && <input className='profile-info-text-input' required={true} onChange={(event) => setPassport_whom(event.target.value) }/>}

                        <p className='profile-info-description'>
                            Кем выдан
                        </p>
                        {!changePassport && <p className='profile-info-text'>{profile.passport_code ? profile.passport_code : empty}</p>}
                        {changePassport && <input className='profile-info-text-input' required={true} onChange={(event) => setPassport_code(event.target.value) }/>}

                        <p className='profile-info-description'>
                            Код подразделения
                        </p>
                        {!changePassport && <p className='profile-info-text'>{profile.passport_data ? profile.passport_data : empty}</p>}
                        {changePassport && <input className='profile-info-text-input' required={true} onChange={(event) => setPassport_data(event.target.value) }/>}

                        <p className='profile-info-description'>
                            Дата выдачи
                        </p>
                    </label>
                    <label className='profile-info-snils'>
                <span className="profile-sub-title">
                        СНИЛС
                    {!changeSnils && <button className='profile-edit-icon' onClick={(e) => {
                        e.preventDefault()
                        setChangeSnils((prev) => !prev)
                    }}><Reactedit/></button>}
                    {changeSnils && <button className='profile-edit-icon' onClick={(e) => {
                        e.preventDefault()
                        HandleClickSnils()
                    }}><Reactedit/></button>}
                    </span>
                        {!changeSnils && <p className='profile-info-text'>{ profile.snils ? profile.snils : empty }</p>}
                        {changeSnils && <input className='profile-info-text-input' required={true} onChange={(event) => setSnils(event.target.value) }/>}
                        <p className='profile-info-description'>
                            Номер и серия
                        </p>
                    </label>
                    <label className='profile-info-inn'>
                <span className="profile-sub-title">
                        ИННㅤ
                    {!changeInn && <button className='profile-edit-icon' onClick={(e) => {
                        e.preventDefault()
                        setChangeInn((prev) => !prev)
                    }}><Reactedit/></button>}
                    {changeInn && <button className='profile-edit-icon' onClick={(e) => {
                        e.preventDefault()
                        HandleClickInn()
                    }}><Reactedit/></button>}
                    </span>

                        {!changeInn && <p className='profile-info-text'>{ profile.inn ? profile.inn : empty }</p>}
                        {changeInn && <input className='profile-info-text-input' required={true} onChange={(event) => setInn(event.target.value) }/>}
                        <p className='profile-info-description'>
                            Номер и серия
                        </p>
                    </label>
                </form>
                <button className='exit-button' onClick={() => {
                    HandleClickLogout()
                }}>Выйти</button>
            </div>}
        </div>
    )
}