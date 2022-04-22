import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom';
import MovieContext from '../contexts/MovieContext';
import "./styles/addForm.css";

export default function AddMovieForm() {

    const {dispatch, sortMovies, state} = useContext(MovieContext);
    const [fields, setFields] = useState({
        title : "",
        overview : "",
        poster_path : "",
        vote_average : "",
        vote_count : ""
        });

    const handleSubmit = (event)=> {
        event.preventDefault();
        console.log(fields);

        //add movie
        const {movies, filterMovieList} = state;
        dispatch({
            type : "SET_MOVIES",
            body : [...movies, fields],
        });

        sortMovies(true, [...filterMovieList, fields]);
        dispatch({type:"SET_ADD_MOVIE"});
        dispatch({
            type : "SET_FEATURED_MOVIE",
            body : {...fields},
        })

    }
  return (

    ReactDOM.createPortal(
        <div id='modal-bg'>
            <div id="form-modal">
                <div className='form-header'><strong>Add Movie</strong> <b onClick={()=>{dispatch({type:"SET_ADD_MOVIE"})}}>&#10060;</b>  </div> 
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder='Movie Title' onChange={(event)=>setFields({...fields, title: event.target.value })}/>
                    <textarea required rows={5} placeholder='Description' onChange={(event)=>setFields({...fields, overview: event.target.value })}></textarea>
                    <input required min={1} max={10} placeholder='Vote Average' type="number" onChange={(event)=>setFields({...fields, vote_average: event.target.value})} />
                
                    <input required type="number" placeholder='Number of Votes' onChange={(event)=>setFields({...fields, vote_count: event.target.value})}/>
                    <input required type="text" placeholder='Image Path' onChange={(event)=>setFields({...fields,poster_path: event.target.value })}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
    </div>
    ,

    document.querySelector('#portal')

    )
  )
}
