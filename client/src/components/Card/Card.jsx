import React from "react";

export default function Card({country}){
    return (
        <>
            <h2>{country.name}</h2>
            <img src={country.flag} alt={country.name} />
            <p>{country.continent}</p>
        </>
    )
}