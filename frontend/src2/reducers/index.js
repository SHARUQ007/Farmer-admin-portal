import { combineReducers } from "redux";
import { map } from "./map";
import { user } from "./user";
import { farmer } from "./farmer";

export const reducers = combineReducers({
    map, user, farmer
})