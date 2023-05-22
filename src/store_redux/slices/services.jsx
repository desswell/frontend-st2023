import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const servicesSlice = createSlice({
    name: "services",
    initialState: {
        Data: [],
        userData: [],
        Notification: []
    },
    reducers: {
        setData(state, {payload}) {
            state.Data = payload
        },
        setId(state, {payload}) {
            state.userData = payload
        },
        setNotification(state, {payload}) {
            state.Notification = payload
        },
        delNotification(state) {
            state.Notification = []
        }
    }
})

export const useData = () =>
    useSelector((state) => state.services.Data)
export const useUserData = () =>
    useSelector((state) => state.services.userData)
export const useNotification = () =>
    useSelector((state) => state.services.Notification)


export const {
    setData: setDataAction,
    setId: setUserDataAction,
    setNotification: setNotificationAction,
    delNotification: delNotificationAction
} = servicesSlice.actions


export default servicesSlice.reducer