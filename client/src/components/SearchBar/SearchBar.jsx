import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions/actions";

function validate(name){
    let errors = {}
    if(!name) errors.name = 'Please type a name'
    if (!/^[a-zA-Z ]*$/.test(name)) errors.name = 'Name should contain only letters'
    return errors
}

export default function SearchBar(){

    const dispatch = useDispatch()
    const [ name, setName ] = useState([""])
    const [ errors, setErrors ] = useState({})

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        setErrors(validate(e.target.value))
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
            <button type='submit' > Search </button>
        </form>
    )
}