import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearDetail, getCountries } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar"
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import h from "./Home.module.css"
import loader from "../Home/loader.gif"

export default function Home(){
    const dispatch = useDispatch()
    let countries = useSelector(state => state.countries)
    const filtrado = useSelector(state => state.filtered)
    // Conservamos el estado filtrado cuando volvemos al home
    filtrado.length ? countries = filtrado : countries = countries
    const error = useSelector(state => state.error)
    const [ order, setOrder ] = useState('')
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
            <div className={h.homeContainer}>
                <NavBar/>
                <Filters 
                setCurrentPage={setCurrentPage}
                setOrder={setOrder}
                currentPage={currentPage}
                />
                <div className={h.cardsContainer} >
                    {currentCountries.map(country => {
                        return (
                            <div>
                                <Link to={'/countries/'+ country.id} >
                                <Card country={country} key={country.id} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Pagination 
                    countriesPerPage={countriesPerPage}
                    currentPage={currentPage}
                    countries={countries.length}
                    pagination={pagination} />
                </div>
            </div>
        )
    } else {
        return (
            <div className={h.loader}>
                {/* <img src={loader} alt="" /> */}
                <h1>Loading...</h1>
            </div>
        )
    }


}