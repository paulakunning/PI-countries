import { GET_COUNTRIES, ERROR } from "../actions/actions";

const initialState = {
    countries: [],
    error: ""
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
    
        default:
            return {...state}
    }
}

export default rootReducer