import { ACTION_TYPES } from "../actions/map";

const initialState = {
    maps: [],
    mapMeta: {},
    isLoading:true
}

export const map = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.MAP_FETCH_ALL:
            return {
                ...state,
                maps: [...action.payload],
                isLoading:false
            }
        case ACTION_TYPES.MAP_CREATE:
            return {
                ...state,
                maps: [...state.maps, action.payload],
                isLoading:false
            }
        case ACTION_TYPES.MAP_UPDATE:
            return {
                ...state,
                maps: state.maps.map(x => x.id === action.payload.id ? action.payload : x),
                isLoading:false
            }
        case ACTION_TYPES.MAP_DELETE:
            return {
                ...state,
                maps:state.maps.filter(x => x.id !== action.payload),
                isLoading:false
            }
        case ACTION_TYPES.MAP_PAGINATION:
            return {
                ...state,
                maps: [...action.payload.maps],
                mapMeta: action.payload.meta,
                isLoading:false
            }
        case ACTION_TYPES.MAP_LOADING:
            return {
                ...state,
                isLoading:action.payload
            }
        default:
            return state;
    }
}