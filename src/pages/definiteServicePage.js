import React from 'react'
import { useParams } from "react-router";

export function DefiniteServicePage() {
    const params = useParams()
    return(
        <div>
            <p className="definiteService-title">
                Заявка на услугу «{params.id}»
            </p>
        </div>
    )
}