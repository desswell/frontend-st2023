import React, {useEffect} from 'react'
import {ServicesCards} from "../components/servicesCards";
import {useDispatch} from "react-redux";
import {useData, setDataAction} from "../store_redux/slices/services";
import {useNavigate} from "react-router-dom";
export function ServicesPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const flag = localStorage.getItem('login') === 'admin'
    useEffect(() => {
        fetch('http://127.0.0.1:8000/uslugi/',{method : "GET"})
            .then((res) => res.json())
            .then((data) => {
                dispatch(setDataAction(data))
                }
            );
    }, [])
    const HandleClick = () => {
        navigate('/services/add')
    }
    const data = useData()
    return(
        <div >
            <ul className='main-card-services'>
                <p className="text-main">Доступные услуги</p>
                { data.map((data) => <ServicesCards Props={data} key={data.id} />) }
            </ul>
            {flag && <button className="main-card-services-button-plus" onClick={HandleClick}>Добавить новую услугу</button>}
        </div>
    )
}