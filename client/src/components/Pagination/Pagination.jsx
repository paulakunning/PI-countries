import React from "react";

export default function Pagination({countriesPerPage, countries, pagination, currentPage}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(countries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }
    
    function handlePrevious(){
       pagination(currentPage-1)
    }

    function handleNext(){
        pagination(currentPage+1)
    }

    return (
        <>
            <h1>Pagination</h1>
            <button disabled={currentPage === 1 ? true : false} onClick={()=>handlePrevious()} > Previous </button>
            
           {/*  <button onClick={()=> pagination(currentPage)} > {currentPage}</button> */}
           {/* <button>{currentPage}</button> */}
            {pageNumbers && pageNumbers.map( n => (
                <button key={n} onClick={()=> pagination(n)} > {n} </button>
            ))}
            <button disabled={currentPage === pageNumbers.length ? true : false} onClick={()=>handleNext()} > Next </button>
        </>
    )
}