import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import axios from "axios";
import { setUserDataAction } from "../store_redux/slices/services";
export function SighIn(){
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch()
    const check_login = localStorage.getItem('login')
    if (check_login) {
        navigate('/main')
    }
    const HandleClick = () => {
        fetch('api/authorize',{method : "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": login, "password": password})})
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (JSON.parse(data)["status"] === "ok") {
                    localStorage.setItem('login', login)
                    window.location.reload()
                } else {
                    setFlag(true)
                }
            });
        axios.get(`http://127.0.0.1:8000/polzovateli/?username=${login}`).then(r => dispatch(setUserDataAction(r.data)))
    };
    return <div className="container-page">
            <div className='RegWrapper'>
                <div className='RegCard_sighIn'>
                    <div className="text1wrapper">
                        <div className="text1">
                            Вход
                        </div>
                    </div>
                    <input onChange={(event) => setLogin(event.target.value)} placeholder='Логин' type="text" className='InputField' />
                    <input onChange={(event) => setPassword(event.target.value)} placeholder='Пароль' type="password" className='InputField' />
                    {flag && <p className="error_password">Неправильно введен логин или пароль</p>}
                    <button className='buttonStyle' onClick={HandleClick}>Войти</button>
                    <div className="text2wrapper">
                        <div className="text21">
                            У вас нет аккаунта?
                        </div>
                        <div className="text22">
                            <Link to={{pathname:"/sighUp"}} className="linkStyle">
                                Зарегистрироваться
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}