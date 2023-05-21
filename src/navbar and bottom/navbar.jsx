import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {ReactComponent as ReactLogo} from '../img/logo.svg';
import {ReactComponent as ReactBell} from "../img/bell.svg";

export function NavigationBar(){
    const [login, setLogin] = useState('')
    useEffect(() => {
        setLogin(localStorage.getItem('login'))
    }, [])
    return(
        <div className="р-100 h-50 ">
            <div className='navbar-container'>
                <ul className='navbar-links'>
                    <Link to='/main'><ReactLogo/>Заявки ГосУслуги</Link>
                    {login && <div className='navbar-links'>
                        <Link to='/main'>Главная</Link>
                        <Link to='/services'>Услуги</Link>
                        <Link to='/profile/'>Профиль</Link>
                        <Link to='/notification'><ReactBell/></Link>
                    </div>}
                </ul>
            </div>
        </div>
    )
}