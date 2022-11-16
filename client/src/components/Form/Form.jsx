import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createActivity, getCountries } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar"

function validate(input){
    let errors ={}
    if (!input.name) {errors.name = 'Name is required'}
    if(!/^[a-zA-Z ]*$/.test(input.name)) {errors.name = 'Name is invalid'}
    if(input.duration < 1 || input.duration > 24) {errors.duration = 'Duration should be a numer betweeen 1 and 24'}
    return errors
}

export default function Form(){
    const allCountries = useSelector((state) => state.allCountries)
    // Sort countries in select option
    const countries = allCountries.sort(function(a,b){
        if(a.name > b.name) return 1
        if(b.name > a.name) return -1
        return 0 })
    const dispatch = useDispatch()
    const history = useHistory()
    const [ errors, setErrors ] = useState({})
    const [ input, setInput ] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countries: []
    })
    useEffect(()=> {
        dispatch(getCountries())
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){   
        const country = e.target.value
        const filterCountry = input.countries.find(c => c === country)
        if(filterCountry) return alert('No puedes agregar dos veces el mismo pais')
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }
    
    function handleCheckDif(e){
        if(e.target.checked){
            setInput({
                ...input,
                difficulty: e.target.value
            })
        }
    }
    function handleCheckSeason(e){
        if(e.target.checked){
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

    function handleDelete(el){
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== el)
        })
    }



    async function handleSubmit(e){
        e.preventDefault();
        try {
            dispatch(createActivity(input))
            alert('Activity created successfully')
            setInput({
                name: "",
                difficulty: 0,
                duration: 0,
                season: "",
                countries: []
            })
            history.push('/countries')
        } catch (error) {
            alert('Oops! Something went wrong. Please try again')
        }
    }

    return (
        <>
        <NavBar/>
            <h1>Form</h1>
            <Link to='/countries' >
                <button>
                    Back to home
                </button>
            </Link>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label> Name: </label>
                    <input
                    type='text'
                    value={input.name}
                    name='name'
                    onChange={(e)=> handleChange(e)}
                    />
                </div>
                <div>
                <label> Difficulty: </label>
                    <input
                    type='radio'
                    id='diff1'
                    name='difficulty'
                    value={1}
                    onChange={(e)=>handleCheckDif(e)}
                    />
                    <label htmlFor='diff1' > Begginer </label>
                    <input
                    type='radio'
                    id='diff2'
                    name='difficulty'
                    value={2}
                    onChange={(e)=>handleCheckDif(e)}
                    />
                    <label htmlFor='diff2' > Amateur </label>
                    <input
                    type='radio'
                    id='diff3'
                    name='difficulty'
                    value={3}
                    onChange={(e)=>handleCheckDif(e)}
                    />
                    <label htmlFor='diff3' > Normal </label>
                    <input
                    type='radio'
                    id='diff4'
                    name='difficulty'
                    value={4}
                    onChange={(e)=>handleCheckDif(e)}
                    />
                    <label htmlFor='diff4' > Professional </label>
                    <input
                    type='radio'
                    id='diff5'
                    name='difficulty'
                    value={5}
                    onChange={(e)=>handleCheckDif(e)}
                    />
                    <label htmlFor='diff5' > Expert </label>
                </div>
                <div>
                <label> Duration: </label>
                    <input
                    type='number'
                    min='1'
                    max='24' 
                    name="duration"
                    value={input.duration}
                    onChange={(e)=>handleChange(e)}
                    /> horas
                </div>
                <div>
                <label> Season: </label>
                <input type="radio" id="seasonChoice1" name='season' value={"Summer"} onChange={(e)=> handleCheckSeason(e)} />
                <label htmlFor="seasonChoice1"> Summer </label>
                <input type="radio" id="seasonChoice2" name='season' value={"Autumn"} onChange={(e)=> handleCheckSeason(e)} />
                <label htmlFor="seasonChoice2"> Autumn </label>
                <input type="radio" id="seasonChoice3" name='season' value={"Spring"} onChange={(e)=> handleCheckSeason(e)} />
                <label htmlFor="seasonChoice3"> Spring </label>
                <input type="radio" id="seasonChoice4" name='season' value={"Winter"} onChange={(e)=> handleCheckSeason(e)} />
                <label htmlFor="seasonChoice4"> Winter </label>
                </div>
                <div>
                <select onChange={(e) => handleSelect(e)} >
                    {countries.map(c => (
                        <option key={c.id}  name={c.name} value={c.name} > {c.name} </option>
                    ))}
                </select>
                </div>
                <div>
                    <button > Create activity </button>
                </div>
            </form>
            {input.countries?.map(el => <div>
                <img src={el} alt="" />
                <p>{el}</p>
                <button onClick={()=> handleDelete(el)}> x </button>
            </div>)}
        </>
    )
}