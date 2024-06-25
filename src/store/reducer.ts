import {DetailAction, DetailState} from "./types.ts";

const initialState: DetailState = {
    id: '',
};

export const detailReducer = (state: DetailState = initialState, action: DetailAction): DetailState => {
    switch (action.type) {
        case "SET_ID":
            return {
                id: action.payload,
            };
        default:
            return state;
    }
};