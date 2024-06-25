import {configureStore} from "@reduxjs/toolkit";
import {detailReducer} from "./reducer.ts";

const store = configureStore({
    reducer: {
        detailReducer: detailReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>

export default store