import { ACTION_TYPES } from "../actions/farmer";

const initialState = {
    farmers: [],
    farmerMeta: {}
}

export const farmer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FARMER_FETCH_ALL:
            return {
                ...state,
                farmers: [...action.payload]
            }
        case ACTION_TYPES.FARMER_CREATE:
            return {
                ...state,
                farmers: [...state.farmers, action.payload]
            }
        case ACTION_TYPES.FARMER_UPDATE:
            return {
                ...state,
                farmers: state.farmers.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.FARMER_DELETE:
            return {
                ...state,
                farmers:state.farmers.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.FARMER_PAGINATION:
            return {
                ...state,
                farmers: [...action.payload.farmers],
                farmerMeta: action.payload.meta
            }
        default:
            return state;
    }
}