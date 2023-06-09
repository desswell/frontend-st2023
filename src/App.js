import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
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
import './styles/addingServices.css'
import 'react-toastify/dist/ReactToastify.css';
import {Bottom} from "./navbar and bottom/bottom";
import {SighIn} from "./pages/sighIn";
import {SighUp} from "./pages/sighUp";
import {Rediracting} from "./pages/rediracting";
import { ServicesPage } from "./pages/servicesPage";
import {DefiniteServicePage} from "./pages/definiteServicePage";
import {Profile} from "./pages/Profile";
import { MyRequestsPage } from "./pages/MyRequestsPage";
import {MyRequestStatus} from "./pages/MyRequestStatus";
import { setUserDataAction, useUserData} from "./store_redux/slices/services";
import axios from "axios";
import {useDispatch} from "react-redux";
import {AllRequests} from "./pages/allRequests";
import {AllRequestsDefinitePage} from "./pages/allRequestsDefinitePage";
import {AddServicesPage} from "./pages/addServicesPage";
import { ToastContainer, toast } from 'react-toastify';
let websocket = new WebSocket('ws://localhost:9000/websockets')

function App(){
    const [notification, setNotification] = useState('')
    const userData = useUserData()
    const login = localStorage.getItem('login')
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (login) {
            websocket.onopen = () => {
                websocket.send(JSON.stringify({
                    "login": login
                }))
            }
        }
    }, [login])
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
    websocket.onmessage =  function(event) {
        setNotification(event.data)
        toast('Статус заявки изменился!');
        console.log(notification)
    };
  return(
      <div>
          <ToastContainer/>
          {loading && <BrowserRouter basename='/'>
              {login && <NavigationBar/>}
              <Routes>
                  <Route exact path='/' element={<Rediracting/>}/>
                  <Route exact path="/main" element={<MainPage/>}/>
                  <Route exact path='/sighIn' element={<SighIn/>}/>
                  <Route exact path='/sighUp' element={<SighUp/>}/>
                  <Route exact path='/services' element={<ServicesPage/>}/>
                  <Route exact path='/services/:id' element={<DefiniteServicePage/>}/>
                  <Route exact path='/services/add' element={<AddServicesPage/>}/>
                  <Route exact path='/profile/' element={<Profile/>}/>
                  <Route exact path='/profile/myrequests' element={<MyRequestsPage/>}/>
                  <Route exact path='/profile/myrequests/:id' element={<MyRequestStatus/>}/>
                  <Route exact path='/allrequests' element={<AllRequests/>}/>
                  <Route exact path='/AllRequestsDefinitePage/:id' element={<AllRequestsDefinitePage/>}/>
              </Routes>
              <Bottom/>
          </BrowserRouter>}
      </div>
  )
}

export default App;