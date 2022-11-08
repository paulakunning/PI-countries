import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions/actions";
import Card from "../Card/Card";

export default function Home(){

    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const error = useSelector(state => state.error)
    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])

    if(error){
        return (
            <>
                <h1>Ocurrió un error al cargar los países</h1>
                <p>{error}</p>
            </>
        )
    } else if (countries.length){
        return (
            <div>
                <h1>Home</h1>
                {countries.map(country => {
                    return (<Card country={country} key={country.id} />)
                })}
            </div>
        )
    } else {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }


}