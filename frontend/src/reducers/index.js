import {combineReducers} from "redux";
import {userReducer} from "./UserReducer";

const allReducers = combineReducers({
    userState: userReducer,
});

export default allReducers