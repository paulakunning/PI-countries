import React from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return (
        <>
            <h1>Landing</h1>
            <button><Link to='/countries'> Start </Link></button>
        </>
    )
}