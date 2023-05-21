import React from "react"
import {useNavigate} from "react-router-dom";

export function ServicesCards(Props){
    const navigate = useNavigate()
    return(
        <div className="available-cards main-card-services-cards"
        onClick={() => {
            navigate(`/services/${Props.Props.id}`)
        }}>
            <p className='available-cards-text main-card-requests-title available-cards-text-title'>
                {Props.Props.name}
            </p>
            <p className='available-cards-text main-card-requests-title '>
                {Props.Props.description}
            </p>
        </div>
    )
}