import React from 'react'
import { useParams } from "react-router";

export function DefiniteServicePage() {
    const params = useParams()
    return(
        <div>
            <p className="definiteService-title">
                Заявка на услугу «{params.id}»
            </p>
            <p className='definiteService-container'>
                Подать заявление на сдачу ЕГЭ и выбрать предметы нужно ежегодно до 1 февраля. Экзамен проводится по 11 дисциплинам. Русский язык и математика являются обязательными, остальные — по желанию. Количество предметов для сдачи неограниченно
                Кто может записаться
                Ученики 11 класса — через классного руководителя или администрацию школы
                В некоторых регионах подать заявление можно онлайн. Например, жители Москвы могут записаться на mos.ru, Московской области — на mosreg.ru
                Выпускники колледжей и прошлых лет — через региональные органы образования по месту жительства
                Какие документы понадобятся
                Паспорт
                СНИЛС
                Справка из образовательной организации об окончании обучения в текущем году — для выпускников колледжей
                Документ о предыдущем уровне образования, например диплом о среднем профессиональном образовании, — для выпускников прошлых лет
            </p>
            <form className='definiteService-input-con'>
                <label className='definiteService-input-con-label'>
                    <input type='number' placeholder='Введите ваш паспорт' className='definiteService-input'/>
                    <span className='definiteService-input-description'>
                          Серия и номер паспорта
                    </span>
                </label>
                <label className='definiteService-input-con-label'>
                    <input type='number' placeholder='Введите ваш СНИЛС' className='definiteService-input'/>
                    <span className='definiteService-input-description'>
                         СНИЛС
                    </span>
                </label>
                <label className='definiteService-input-con-label definiteService-input-checkbox-text'>
                    <input type='checkbox' required={true} />
                    <span className='definiteService-input-checkbox'>Согласен(а) на обработку персональных данных</span>
                </label>
                <label className='definiteService-input-con-label'>
                    <button className='definiteService-button'>Отправить</button>
                </label>
            </form>
        </div>
    )
}