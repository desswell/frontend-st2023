import { combineReducers, configureStore } from "@reduxjs/toolkit"
import servicesReducer from "./slices/services";
export default configureStore({
    reducer: combineReducers({
        services: servicesReducer
    })
})