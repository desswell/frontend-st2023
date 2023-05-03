import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const servicesSlice = createSlice({
    name: "services",
    initialState: {
        Data: [],
    },
    reducers: {
        setData(state, {payload}) {
            state.Data = payload
        },
    }
})

export const useData = () =>
    useSelector((state) => state.services.Data)


export const {
    setData: setDataAction,
} = servicesSlice.actions


export default servicesSlice.reducer