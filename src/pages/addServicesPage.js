import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export function AddServicesPage() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const HandleClickAdd = () => {
        if (name || description) {
            axios.post('/api/addUsl', {
                "name": name, 'description': description
            }).then(r => console.log(r.data))
            navigate('/services')
        } else {
            setError(true)
        }
    }
    const HandleClickCancel = () => {
        navigate('/services')
    }
    return(
        <div>
            <input type="text" className="text-input-name text-input-name-text" required={true} onChange={(event) => setName(event.target.value)} placeholder="Введите название..."/>
            <textarea className="text-input-desc text-input-name-text" required={true} onChange={(event) => setDescription(event.target.value)} placeholder="Введите описание..."/>
            {error && <p className="error_password error_name"> Вы не ввели значения {name ? '' : 'Название'} {description ? '' : 'Описание'}</p>}
            <button className="text-button-add button-add" onClick={HandleClickAdd}>Добавить</button>
            <button className="text-button-cancel button-add" onClick={HandleClickCancel}>Отменить</button>
        </div>
    )
}