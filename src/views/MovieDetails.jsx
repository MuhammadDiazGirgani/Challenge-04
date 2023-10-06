import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiKey = '08a7cbb1d8fe54cae31787a3e5bc00d2';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        const data = await response.json();
        setMovie(data);

        const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`);
        const videosData = await videosResponse.json();

        const trailer = videosData.results.find(video => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="img-fluid rounded"
        style={{ width: '100%', height: 'auto', filter: 'brightness(30%)' }}
      />
      <div
        className='deskripsi'
        style={{
          marginTop: '-800px',
          paddingLeft: '120px',
          position: 'absolute',
          color: '#fff',
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          style={{ width: '300px', height: 'auto', marginBottom: '10px', marginTop:'100px' }}
        />
        <div className='teks' style={{paddingLeft:'320px', marginTop:'-400px', width:'70%'}}>
        <h2>{movie.title}</h2>
        <p>
          <FaStar style={{ color: '#FFD700', marginRight: '4px' }} />
          {movie.vote_average}
        </p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        <p>{movie.overview}</p>
        {trailerKey && (
          <a
            href={`https://www.youtube.com/watch?v=${trailerKey}`}
            target="_blank"
            className="btn btn-primary"
            style={{
              borderRadius: '999px',
              borderColor: '#DC3545',
              backgroundColor: '#DC3545',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              width: '150px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8d0208'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#DC3545'}
          >
            <FaPlay style={{ marginRight: '8px' }} /> Watch Trailer
          </a>
        )}</div>
      </div>
    </div>
  );
};

export default MovieDetails;
