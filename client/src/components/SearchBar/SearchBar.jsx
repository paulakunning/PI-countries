import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions/actions";

export default function SearchBar(){

    const dispatch = useDispatch()
    const [ name, setName ] = useState([""])

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getCountriesByName(name))
        setName("")
    }

    return (
        <form onSubmit={(e)=> handleSubmit(e)}>
            <input 
            value={name}
            type='text'
            placeholder='Type a country'
            onChange={(e) => handleInputChange(e)}
            
            />
            <button type='submit'> Search </button>
        </form>
    )
}