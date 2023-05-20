import React from 'react'
import {ServicesCards} from "../components/servicesCards";
const data = [
    {
        title: '«Ипотека на полвека»',
        id: 1,
        description: 'Данная ипотека хорошо подходит для людей, которые собираются жить больше полувека и практически не выплачивать проценты с ипотеки',
    },
    {
        title: '«Запись к врачу»',
        id: 2,
        description: 'Заявка предназначена для записи к врачу'
    },
    {
        title: '«Запись к врачу»',
        id: 3,
        description: 'Заявка предназначена для записи к врачу'
    },
    {
        title: '«Запись к врачу»',
        id: 4,
        description: 'Заявка предназначена для записи к врачу'
    }
]
export function ServicesPage(){

    return(
        <div >
            <ul className='main-card-services'>
                <p className="text-main">Доступные услуги</p>
                { data.map((data) => <ServicesCards Props={data} key={data.id} />) }
            </ul>
        </div>
    )
}