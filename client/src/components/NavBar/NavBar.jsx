import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar(){
    return (
        <div>
            <div>
                <NavLink to='/countries' > Home </NavLink>
            </div>
            <div>
                <NavLink to='/form'> Create activity </NavLink>
            </div>
        </div>
    )
}