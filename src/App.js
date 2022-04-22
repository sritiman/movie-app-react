import './App.css';
import Header from './components/Header';
import FeaturedMovie from './components/FeaturedMovie';
import MovieList from './components/MovieList';

import {useEffect, useReducer, useState} from "react";
import MovieContext from './contexts/MovieContext';
import AddMovieForm from './components/AddMovieForm';
import Pagination from './components/Pagination';
import Footer from './components/Footer';



const reducerFunc = (state ,  action) => {
  switch(action.type) {
    case "SET_MOVIES" :
      // return {...state, movies : action.body}
      return {
        movies : action.body,
        filterMovieList : state.filterMovieList,
        featuredMovie : state.featuredMovie,
        addMovie : state.addMovie,
      }
    case "SET_FILTERED_MOVIE_LIST" :
      // return {...state, movies : action.body}
      return {
        movies : state.movies,
        filterMovieList : action.body,
        featuredMovie : state.featuredMovie,
        addMovie : state.addMovie,
      }
    case "SET_FEATURED_MOVIE" :
      // return {...state, movies : action.body}
      return {
        movies : state.movies,
        filterMovieList : state.filterMovieList,
        featuredMovie : action.body,
        addMovie : state.addMovie,
      }
    case "SET_ADD_MOVIE" :
      // return {...state, movies : action.body}
      return {
        movies : state.movies,
        filterMovieList : state.filterMovieList,
        featuredMovie : state.featuredMovie,
        addMovie : !state.addMovie,
      }
    default :
      return state;  
  }
}



function App() {
  
  const URL = "https://api.themoviedb.org/3/movie/popular?api_key=5737b7855c47021346977222e0f67768&language=en-US";
  const [pageNo, setPageNo] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(5);
  
  const [state, dispatch] = useReducer(reducerFunc, {
    movies : [],
    filterMovieList : [],
    featuredMovie : {},
    addMovie : false,
  });
  
  
  const filterMovies = (keywords)=> {
    const filteredmovieList = state.movies.filter((movie)=> movie.title.toLowerCase().includes(keywords.toLowerCase()));

    
    dispatch( {
      type : "SET_FILTERED_MOVIE_LIST",
      body : [...filteredmovieList],
    })

    const currentMovie = filteredmovieList[parseInt(Math.random()*filteredmovieList.length)]
    setBanner(currentMovie.title, currentMovie.overview, currentMovie.poster_path, currentMovie.vote_average, currentMovie.vote_count);
    setPageNo(1);
  }

  


  const sortMovies = (ascending = true, tobeFiltered = [...state.filterMovieList])=> {
    // const tobeFiltered = [...filteredmovieList];
     if(ascending)
        tobeFiltered.sort((movie1, movie2)=> movie1.title.toLowerCase().localeCompare(movie2.title.toLowerCase())) 
     else   
        tobeFiltered.sort((movie1, movie2)=> movie2.title.toLowerCase().localeCompare(movie1.title.toLowerCase()))
     
    dispatch( {
      type : "SET_FILTERED_MOVIE_LIST",
      body : [...tobeFiltered],
    })
  
    
    const currentMovie = tobeFiltered[parseInt(Math.random()*tobeFiltered.length)]
    setBanner(currentMovie.title, currentMovie.overview, currentMovie.poster_path, currentMovie.vote_average, currentMovie.vote_count);
  }

  const setBanner=(title, overview, poster_path, vote_average, vote_count)=> {
    const featuredMovie = {
      title,
      overview,
      poster_path,
      vote_average,
      vote_count
    };
    dispatch({
      type : "SET_FEATURED_MOVIE",
      body : {...featuredMovie},
    })
  }

  useEffect(()=> {
      fetch(URL).then((response)=> response.json())
      .then((data)=>data.results)
      .then((results)=> {
    
        const moviesList = results.map((movie)=> Object({
          title  : movie.title,
          overview : movie.overview,
          poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          vote_average : movie.vote_average,
          vote_count: movie.vote_count
        }))

        sortMovies(true, moviesList);
  
        dispatch({
          type : "SET_MOVIES",
          body : [...moviesList],
        })

        
      })
      
    
  },[]);


  return (
  <MovieContext.Provider value={{state, setBanner, dispatch, sortMovies}}>
    {state.addMovie ? <AddMovieForm/> : <> </>}
      <Header filterMovies = {filterMovies} sortMovies={sortMovies} setMoviesPerPage={setMoviesPerPage} setPageNo={setPageNo}/>
       <FeaturedMovie />
       <Pagination moviesPerPage={moviesPerPage} setPageNo={setPageNo} pageNo={pageNo}/>
      <MovieList pageNo={pageNo} moviesPerPage={moviesPerPage}/>
      <Footer/>
  </MovieContext.Provider>

  );
}

export default App;
