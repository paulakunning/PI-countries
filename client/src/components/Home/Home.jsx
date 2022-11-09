import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Home(){
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const error = useSelector(state => state.error)

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ countriesPerPage, setCountriesPerPage ] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = currentPage === 1 ? countries.slice(indexOfFirstCountry, 9) : countries.slice(indexOfFirstCountry, indexOfLastCountry)

    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])

    const pagination = (pagenumber) => {
        setCurrentPage(pagenumber)
    }

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
                <div>
                    <Pagination 
                    countriesPerPage={countriesPerPage}
                    currentPage={currentPage}
                    countries={countries.length}
                    pagination={pagination} />
                </div>
                <div>
                    <h1>Home</h1>
                    {currentCountries.map(country => {
                        return (<Card country={country} key={country.id} />)
                    })}
                </div>
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