import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { MyRequests } from "../components/myRequests";
import {useUserData} from "../store_redux/slices/services";

export function MyRequestsPage(){
    const userData = useUserData()
    const id = userData[0].id
    const [data, setData] = useState([])
    const [value, setValue] = useState('')
    const searchRequests = data.filter((r) => {
        if (r.id == value) {
            return r.id
        }
        if (value === '') {
            return r
        }
    })
    console.log(searchRequests)
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/zayavkipolz/?id_user=${id}`,{method : "GET"})
            .then((res) => res.json())
            .then((data) => {
                    setData(data)
                }
            );
    }, [setData])

    return(
        <div className='profile-div'>
            <p className="profile-title">
                Мои заявки
            </p>
            <ul className='profile-menu'>
                <Link to="/profile" className="profile-menu-disable">Данные и документы</Link>
                <Link to='/profile/myrequests' className="profile-menu-active">Мои заявки</Link>
            </ul>
            <div className='search'>
            <input type='text' className="searching-bar" placeholder='Введите номер заявки...' onChange={(event) => setValue(event.target.value)}/>
            </div>
            {searchRequests && <div className="profile-requests">
                {searchRequests.map((data) => <MyRequests Props={data} key={data.id}/>)}
            </div>}
        </div>
    )
}