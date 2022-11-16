import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createActivity } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar"

export default function Form(){
    const allCountries = useSelector((state) => state.allCountries)
    const dispatch = useDispatch()
    const [ input, setInput ] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countries: []
    })

    function handleSelect(e){   
        const country = e.target.value
        const filterCountry = input.countries.find(c => c === country)
        if(filterCountry) return alert('No puedes agregar dos veces el mismo pais')
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
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
                    />
                </div>
                <div>
                <label> Difficulty: </label>
                    <input
                    type='radio'
                    id='diff1'
                    name='difficulty'
                    value={input.difficulty}
                    />
                    <label for='diff1' > Begginer </label>
                    <input
                    type='radio'
                    id='diff2'
                    name='difficulty'
                    value={input.difficulty}
                    />
                    <label for='diff2' > Amateur </label>
                    <input
                    type='radio'
                    id='diff3'
                    name='difficulty'
                    value={input.difficulty}
                    />
                    <label for='diff3' > Normal </label>
                    <input
                    type='radio'
                    id='diff4'
                    name='difficulty'
                    value={input.difficulty}
                    />
                    <label for='diff4' > Professional </label>
                    <input
                    type='radio'
                    id='diff5'
                    name='difficulty'
                    value={input.difficulty}
                    />
                    <label for='diff5' > Expert </label>
                </div>
                <div>
                <label> Duration: </label>
                    <input
                    type='number'
                    min='1'
                    max='24' 
                    />
                </div>
                <div>
                <label> Season: </label>
                <input type="radio" id="seasonChoice1" name='season' value={input.season} />
                <label for="seasonChoice1"> Summer </label>
                <input type="radio" id="seasonChoice2" name='season' value={input.season} />
                <label for="seasonChoice2"> Autumn </label>
                <input type="radio" id="seasonChoice3" name='season' value={input.season} />
                <label for="seasonChoice3"> Spring </label>
                <input type="radio" id="seasonChoice4" name='season' value={input.season} />
                <label for="seasonChoice4"> Winter </label>
                </div>
                <div>
                <select onChange={(e) => handleSelect(e)} >
                    {allCountries.map(c => (
                        <option key={c.id} value={c.name} >{c.name}</option>
                    ))}
                </select>
                </div>
                <div>
                    <button> Create activity </button>
                </div>
            </form>
            {input.countries.map(el => <div>
                <img src={el} alt="" />
                <p>{el}</p>
                <button onClick={()=> handleDelete(el)}> x </button>
            </div>)}
        </>
    )
}