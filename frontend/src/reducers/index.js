import {combineReducers} from "redux";
import {userReducer} from "./UserReducer";
import {contractorRequestReducer} from "./ContractorRequestReducer";

const allReducers = combineReducers({
    userState: userReducer,
    contractorRequestState: contractorRequestReducer,
});

export default allReducers