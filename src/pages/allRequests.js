import React, {useEffect, useState} from "react";
import { AllRequestsMap } from "../components/allRequests";


export function AllRequests(){
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
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/zayavkipolz/`,{method : "GET"})
            .then((res) => res.json())
            .then((data) => {
                    setData(data)
                }
            );
    }, [setData])
    return(
        <div className='profile-div'>
            <div className='search'>
                <input type='number' className="searching-bar" onChange={(event) => {
                    setValue(event.target.value)
                }} placeholder='Введите номер заявки...'/>
            </div>
            {searchRequests && <div className="profile-requests">
                {searchRequests.map((data) => <AllRequestsMap Props={data} key={data.id}/>)}
            </div>}
        </div>
    )
}