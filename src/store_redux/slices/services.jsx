import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const servicesSlice = createSlice({
    name: "services",
    initialState: {
        Data: [],
        userData: [],
    },
    reducers: {
        setData(state, {payload}) {
            state.Data = payload
        },
        setId(state, {payload}) {
            state.userData = payload
        }
    }
})

export const useData = () =>
    useSelector((state) => state.services.Data)
export const useUserData = () =>
    useSelector((state) => state.services.userData)

export const {
    setData: setDataAction,
    setId: setUserDataAction,
} = servicesSlice.actions


export default servicesSlice.reducer