import React,{useContext} from 'react'
import MovieContext from '../contexts/MovieContext';
import './styles/header.css';

export default function Header({filterMovies, sortMovies, setMoviesPerPage, setPageNo}) {
    const {dispatch} = useContext(MovieContext)
    const handleChange = (event)=> {
        console.log(event.target.value);
        filterMovies(event.target.value);
    }

    const handleMppChange = (event)=> {
        setMoviesPerPage(event.target.value);
        setPageNo(1);
    }
  return (

    <header>
        <h1>Movies</h1>
        <ul>
            <li>
                <label htmlFor="">Movies Per Page: </label>
                <input min={1} max={10} defaultValue={5} type="number" onChange={handleMppChange}/>
            </li>
            <li>
                <button onClick={()=>dispatch({type: "SET_ADD_MOVIE"})}>Add Movie</button>
            </li>
            <li>
                <button onClick={()=>sortMovies(true)}>A-Z</button>
            </li>
            <li>
                <button onClick={()=>sortMovies(false)}>Z-A</button>

            </li>
            <li>
                <input id="movie-search-bar" type="text" placeholder='Search...' onChange={handleChange}/>
            </li>
        </ul>
    </header>
  )
}
