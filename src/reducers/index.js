import { combineReducers } from "redux";
import table1Reducer from './table1Reducer';


// Combine all reducers as root reducer
export default combineReducers({
	table1: table1Reducer,

});