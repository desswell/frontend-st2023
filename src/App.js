import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavigationBar } from "./navbar and bottom/navbar";
import MainPage from "./pages/mainPage";
import './styles/navbarStyle.css'
import './styles/container_css.css'
import './styles/sighIn.css'
import './styles/card-recent-requests.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/card-serveses-all.css'
import './styles/definiteService.css'
import {Bottom} from "./navbar and bottom/bottom";
import {SighIn} from "./pages/sighIn";
import {SighUp} from "./pages/sighUp";
import {Rediracting} from "./pages/rediracting";
import { ServicesPage } from "./pages/servicesPage";
import {DefiniteServicePage} from "./pages/definiteServicePage";


function App(){
  return(
      <BrowserRouter basename='/'>
        <NavigationBar/>
        <Routes>
            <Route exact path='/' element={<Rediracting/>}/>
            <Route exact path="/main" element={<MainPage/>} />
            <Route exact path='/sighIn' element={<SighIn/>} />
            <Route exact path='/sighUp' element={<SighUp/>} />
            <Route exact path='/services' element={<ServicesPage/>}/>
            <Route exact path='/services/:id' element={<DefiniteServicePage/>}/>
        </Routes>
          <Bottom/>
      </BrowserRouter>
  )
}

export default App;