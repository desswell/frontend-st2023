import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

export function RecentRequests(Props){
    const navigate = useNavigate()
    const [background_colors, setBackground_colors] = useState('')
    const [colorText, setColorText] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    useEffect( () => {
        if (Props.Props.status === 'accepted') {
            setBackground_colors('main-card-requests-background-accept')
            setColorText('main-card-requests-title main-card-requests-title-accept')
            setDescription('Ваша заявка одобрена, Вы можете подъехать в банк для оформления договора.')
            setIcon('bi bi-check-circle main-card-requests-icon-accept')
        } else if (Props.Props.status === 'consideration') {
            setBackground_colors('main-card-requests-background-consideration')
            setColorText('main-card-requests-title main-card-requests-title-consideration')
            setDescription('Ваша заявка находится на стадии рассмотрения, пожалуйста, подождите.')
            setIcon('bi bi-info-circle main-card-requests-icon-consideration')
        } else if (Props.Props.status === 'discard') {
            setBackground_colors('main-card-requests-background-discard')
            setColorText('main-card-requests-title main-card-requests-title-discard')
            setDescription('Ваша заявка отклонина')
            setIcon('bi bi-x-octagon main-card-requests-icon-discard')
        }
    }, [Props]
)
    const background_color = ['main-card-requests-cards', background_colors]
    return(
        <div className={background_color.join(' ')}
             onClick={() => navigate(`/profile/myRequests/${Props.Props.id}`)}>
                <p className={ colorText }>
                    <span className={icon}></span>
                    Заявка на услугу: {Props.Props.title}</p>
                <p className={ colorText }> { description } </p>
        </div>
    )

}