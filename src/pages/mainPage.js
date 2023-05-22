import React, {useEffect, useState} from 'react'
import {RecentRequests} from "../components/recentRequests";
import {useUserData} from "../store_redux/slices/services";

export default function MainPage(){
    const [data, setData] = useState()
    const userData = useUserData()
    const id = userData[0].id
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/zayavkipolz/?id_user=${id}`,{method : "GET"})
            .then((res) => res.json())
            .then((data) => {
                    setData(data)
                }
            );
    }, [setData])
    return(
        <div>
            {data && <div>
                <ul className='main-card-requests'>
                    <p className="text-main">Недавние заявки</p>
                    { data.map((data) => <RecentRequests Props={data} key={data.id}/>) }
                </ul>
            </div>}
        </div>
    )
}