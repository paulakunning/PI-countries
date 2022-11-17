import React from "react";
import { Link } from "react-router-dom";
import l from "../Landing/Landing.module.css"

export default function Landing(){
    return (
      <div className={l.landing}>
        <div className={l.landingContainer} >
        <h1>Welcome to Countries App</h1>
        <button className={l.startBtn} >
          <Link to="/countries"> Start </Link>
        </button>
        <h2>Are you ready?</h2>
        </div>
      </div>
    );
}