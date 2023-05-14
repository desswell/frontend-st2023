import React from 'react'
import {RecentRequests} from "../components/recentRequests";
const data = [
    {
        title: '«Ипотека на полвека»',
        id: 1,
        status: 'accepted',
    },
    {
        title: '«Запись к врачу»',
        id: 2,
        status: 'consideration'
    }
]
export default function MainPage(){

    return(
        <div >
            <ul className='main-card-services'>
                <p className="text-main">Недавние заявки</p>
                { data.map((data) => <RecentRequests Props={data} key={data.id} />) }
            </ul>
        </div>
    )
}