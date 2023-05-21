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
    if (!userData){
        navigate('/sighIn')
    }
    const HandleClick = () => {
        axios.get('http://127.0.0.1:8000/api/logout').then(r => {
            localStorage.removeItem('login')
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
                        <button className='profile-edit-icon'><Reactedit/></button>
                    </span>
                        <p className='profile-info-text'>{profile.passport ? profile.passport : empty}</p>
                        <p className='profile-info-description'>
                            Серия и номер
                        </p>
                        <p className='profile-info-text'>{profile.passport_whom ? profile.passport_whom : empty}</p>
                        <p className='profile-info-description'>
                            Кем выдан
                        </p>
                        <p className='profile-info-text'>{profile.passport_code ? profile.passport_code : empty}</p>
                        <p className='profile-info-description'>
                            Код подразделения
                        </p>
                        <p className='profile-info-text'>{profile.passport_data ? profile.passport_data : empty}</p>
                        <p className='profile-info-description'>
                            Дата выдачи
                        </p>
                    </label>
                    <label className='profile-info-snils'>
                <span className="profile-sub-title">
                        СНИЛС
                    </span>
                        <p className='profile-info-text'>{ profile.snils ? profile.snils : empty }</p>
                        <p className='profile-info-description'>
                            Номер и серия
                        </p>
                    </label>
                    <label className='profile-info-inn'>
                <span className="profile-sub-title">
                        ИНН
                    </span>
                        <p className='profile-info-text'>{ profile.inn ? profile.inn : empty }</p>
                        <p className='profile-info-description'>
                            Номер и серия
                        </p>
                    </label>
                </form>
                <button className='exit-button' onClick={() => {
                    HandleClick()
                }}>Выйти</button>
            </div>}
        </div>
    )
}