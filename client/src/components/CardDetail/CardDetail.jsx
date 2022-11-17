import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDetail } from "../../redux/actions/actions";

export default function Detail(props){
    const dispatch = useDispatch()
    const id =':'+(props.match.params.id)

    useEffect(()=> {
        dispatch(getDetail(id))
        return () => {dispatch(clearDetail())}
    }, [dispatch])

    const country = useSelector((state) => state.detail)

    return (
        <>
        <div>
            <h1>{country.name}</h1>
            <h1>{country.id}</h1>
            <p>{country.capital}</p>
            <p>{country.subregion}</p>
            <p> Area: {new Intl.NumberFormat().format(country.area)} km² </p>
            <p> Population: {new Intl.NumberFormat().format(country.population)}</p>
            <p> Activities: {country.activities?.map(el => el["name"])}</p>
            <img src={country.flag} />
        </div>
        </>
    )
}