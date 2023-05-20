import React from "react";
import {Link} from "react-router-dom";

export function Profile(){
    return(
        <div className='profile-div'>
            <p className="profile-title">
            Профиль
            </p>
            <ul className='profile-menu'>
                <Link to="/profile" className="profile-menu-active">Данные и документы</Link>
                <Link to='/profile/myrequests' className="profile-menu-disable">Мои заявки</Link>
            </ul>
            <form>
                <label className='profile-info'>
                    <span>
                        Паспорт
                    </span>
                </label>
                <label>

                </label>
                <label>

                </label>
            </form>
        </div>
    )
}