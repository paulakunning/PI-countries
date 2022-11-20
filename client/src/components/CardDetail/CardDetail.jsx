import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDetail } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import cd from '../CardDetail/CardDetail.module.css'
import area from './detailIcons/area.png'
import capital from './detailIcons/capital.png'
import subregion from './detailIcons/subregion.png'
import continent from './detailIcons/continent.png'
import population from './detailIcons/population.png'

export default function Detail(props){
    const dispatch = useDispatch()
    const id =':'+(props.match.params.id)
    const country = useSelector((state) => state.detail)
    const error = useSelector((state)=> state.error)

    useEffect(()=> {
        dispatch(getDetail(id))
        console.log(error)
        return () => {dispatch(clearDetail())}
    }, [dispatch])

    if(error !== null) return( <p>{error}</p>)

   if (country) {
    return (
      <div className={cd.detailContainer}>
        <div className={cd.btnContainer}>
          <Link to="/countries">
            <button className={cd.backBtn}> Back to home </button>
          </Link>
        </div>
        <div>
          <img src={country.flag} alt='country flag' />
          <h1>
            {country.name} ({country.id})
          </h1>
        </div>
        <div className={cd.detailIcons}>
          <img src={continent} alt="continentIcon" />
          <p>Continent: {country.continent}</p>
        </div>
        <div className={cd.detailIcons}>
          <img src={capital} alt="capitalIcon" />
          <p>Capital: {country.capital}</p>
        </div>
        <div className={cd.detailIcons}>
          <img src={subregion} alt="subregionIcon" />
          <p>Subregion : {country.subregion}</p>
        </div>
        <div className={cd.detailIcons}>
          <img src={area} alt="areaIcon" />
          <p> Area: {new Intl.NumberFormat().format(country.area)} km² </p>
        </div>
        <div className={cd.detailIcons}>
          <img src={population} alt="populationIcon" />
          <p>
            {" "}
            Population: {new Intl.NumberFormat().format(country.population)}
          </p>
        </div>
        {country.activities !== undefined ? (
          country.activities.map((el) => <p> {el["name"]}</p>)
        ) : (
          <p>There is no activities for this country</p>
        )}
      </div>
    ) }
}