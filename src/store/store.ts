import { configureStore } from "@reduxjs/toolkit"
import orgReducer from "./slice"

export const store = configureStore({
    reducer: {
        organizations: orgReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch