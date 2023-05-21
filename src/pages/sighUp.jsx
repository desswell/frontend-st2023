import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export function SighUp(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [againPassword, setAgainPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false)
    const navigate = useNavigate()
    const HandleClick = () => {
        if (againPassword === password) {
            setWrongPassword(false)
            fetch('/api/create', {
                method: "POST",
                body: JSON.stringify({username: login, password: password})
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data["status"] === "ok") {
                        navigate("/SighIn")
                    }
                })
        } else {
            setWrongPassword(true)
        }
    };
    return  <div>
        <div className='RegWrapper'>
            <div className='RegCard'>
                <div className="text1wrapper">
                    <div className="text1">
                        Регистрация
                    </div>
                </div>
                <input onChange={(event) => setLogin(event.target.value)} placeholder='Логин' type="text" className='InputField' />
                <input onChange={(event) => setPassword(event.target.value)} placeholder='Пароль' type="password" className='InputField' />
                <input onChange={(event) => setAgainPassword(event.target.value)} placeholder='Еще раз пароль' type="password" className='InputField' />
                {wrongPassword && <div className="error_password">Пароли не совпадают</div>}
                <button className='buttonStyle'  onClick={HandleClick}>Зарегистрироваться</button>
                <div className="text2wrapper">
                    <div className="text21">
                        Уже есть аккаунт?
                    </div>
                    <div className="text22">
                        <Link to={{pathname:"/SighIn"}} className="linkStyle">
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}