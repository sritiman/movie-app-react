import React, {useContext} from 'react'
import MovieContext from '../contexts/MovieContext';
import "./styles/featuredMovie.css";

export default function FeaturedMovie() {
  const {state} = useContext(MovieContext);
  const featuredMovie = state.featuredMovie;
  return (
    <section style={{background : "url({featuredMovie.poster_path})"}}>
      <figure>
        <img src={`${featuredMovie.poster_path}`} alt="Movie banner" />
        <figcaption>
            <div>
            <h2>{featuredMovie.title}</h2>
            <p className='rating'><i class="fa-solid fa-star"></i> {featuredMovie.vote_average}</p>
            <p className='type'>{featuredMovie.vote_count}+ votes</p>
            <p>{featuredMovie.overview}</p>
            </div>
        </figcaption>
      </figure>
      
    </section>
  )
}
