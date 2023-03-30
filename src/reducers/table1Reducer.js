import { TABLE1_LOADING, TABLE1_GET_ALL_SUCCESS, TABLE1_ERROR, TABLE1_CLEAR_SNACKBAR } from '../constants/types';

const initialState = {
    table1List: [],
    loading: true,
    status: "success",
    text: "",
    showSnackbar: false
};

const table1Reducer = (state = initialState, action) => {
    switch (action.type) {
        case TABLE1_CLEAR_SNACKBAR: 
            return {
                ...state,
                showSnackbar: false
            }
        case TABLE1_LOADING: 
            return {
                ...state,
                loading: true,
            }
        case TABLE1_ERROR:
            return {
                ...state,
                table1List: [],
                loading: false,
                status: action.payload.status,
                text: action.payload.text,
                showSnackbar: true
            }
        case TABLE1_GET_ALL_SUCCESS:
            return {
                ...state,
                table1List: action.payload.table1List,
                loading: false,
                status: action.payload.status,
                text: action.payload.text,
                showSnackbar: true
            }
        default: 
            return state || {};
    }
}

export default table1Reducer;