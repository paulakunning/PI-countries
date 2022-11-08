import axios from 'axios'
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const ERROR = 'ERROR'

export function getCountries(){
    return async function(dispatch){
        try {
            const json = await axios.get('http://localhost:3001/countries')
            return dispatch({
                type: GET_COUNTRIES,
                payload: json.data
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: error.message
            })
        }
        
    }
}