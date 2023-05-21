import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import { NavigationBar } from "./navbar and bottom/navbar";
import MainPage from "./pages/mainPage";
import './styles/navbarStyle.css'
import './styles/container_css.css'
import './styles/sighIn.css'
import './styles/card-recent-requests.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/card-serveses-all.css'
import './styles/definiteService.css'
import './styles/profile.css'
import {Bottom} from "./navbar and bottom/bottom";
import {SighIn} from "./pages/sighIn";
import {SighUp} from "./pages/sighUp";
import {Rediracting} from "./pages/rediracting";
import { ServicesPage } from "./pages/servicesPage";
import {DefiniteServicePage} from "./pages/definiteServicePage";
import {Profile} from "./pages/Profile";
import { MyRequestsPage } from "./pages/MyRequests";
import {MyRequestStatus} from "./pages/MyRequestStatus";
import {setUserDataAction, useUserData} from "./store_redux/slices/services";
import axios from "axios";
import {useDispatch} from "react-redux";


function App(){
    const userData = useUserData()
    const login = localStorage.getItem('login')
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (userData.length === 0 && login){
            axios.get(`http://127.0.0.1:8000/polzovateli/?username=${login}`).then(r => {
                dispatch(setUserDataAction(r.data))
                setLoading(true)
            })
        } else {
            setLoading(true)
        }
    }, [])
  return(
      <div>
          {loading && <BrowserRouter basename='/'>
              <NavigationBar/>
              <Routes>
                  <Route exact path='/' element={<Rediracting/>}/>
                  <Route exact path="/main" element={<MainPage/>}/>
                  <Route exact path='/sighIn' element={<SighIn/>}/>
                  <Route exact path='/sighUp' element={<SighUp/>}/>
                  <Route exact path='/services' element={<ServicesPage/>}/>
                  <Route exact path='/services/:id' element={<DefiniteServicePage/>}/>
                  <Route exact path='/profile/' element={<Profile/>}/>
                  <Route exact path='/profile/myrequests' element={<MyRequestsPage/>}/>
                  <Route exact path='/profile/myrequests/:id' element={<MyRequestStatus/>}/>
              </Routes>
              <Bottom/>
          </BrowserRouter>}
      </div>
  )
}

export default App;