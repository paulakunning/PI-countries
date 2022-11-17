import React from "react";
import { NavLink } from "react-router-dom";
import n from '../NavBar/NavBar.module.css'
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar(){
    return (
      <div className={n.navContainer}>
        <div className={n.searchBarCont}>
          <SearchBar />
        </div>
        <div className={n.linksContainer}>
            <div className={n.links}>
                <NavLink to="/countries"> Home </NavLink> 
            </div>
           <div className={n.links} >
            <NavLink to="/form"> Create activity </NavLink>
           </div>
        </div>
      </div>
    );
}