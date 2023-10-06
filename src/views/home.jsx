import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import './posts/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiKey = '08a7cbb1d8fe54cae31787a3e5bc00d2';
const popularMoviesEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let endpoint = popularMoviesEndpoint;

        if (searchQuery) {
          const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
          endpoint = searchEndpoint;
        }

        const response = await fetch(endpoint);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(popularMoviesEndpoint);
        const data = await response.json();
        setPopularMovies(data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };
  
    fetchPopularMovies();
  }, []);
  
  return (
    <div>
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    {popularMovies.slice(0, 5).map((movie, index) => (
      <button
        key={movie.id}
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to={index}
        className={index === 0 ? "active" : ""}
        aria-label={`Slide ${index + 1}`}
      ></button>
    ))}
  </div>
  <div className="carousel-inner">
  // ...

{popularMovies.slice(0, 5).map((movie, index) => (
  <div key={movie.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
    <img
      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      className="d-block w-100"
      alt={movie.title}
      style={{ width: '80%', filter: 'brightness(50%)',  }}
    />
    <div className="carousel-caption d-none d-md-block">
      <h1 className='h1slide' style={{marginTop:"-520px", fontSize:'60px', width:'55%', textAlign:'left'}}>{movie.title}</h1>
      <p style={{ textAlign: 'left', fontSize: '20px' }}>{movie.overview} </p>
      <a
        href={``}
        target="_blank"
        className="btn"
        style={{
          marginLeft:'-85%',
          borderRadius: '999px',
          backgroundColor: '#D90811',
          color: '#fff',
          transition: 'background-color 0.5s',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8d0208'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#D90811'}
      >
        <FaPlay style={{ marginRight: '8px', marginBottom: '5px' }} />
        Watch Trailer
      </a>
    </div>
  </div>
))}



  </div>
  <button className="carousel-control-prev"  type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5"> 
        <h2 className="display-5 " style={{fontSize:'40px', fontWeight:'600', marginTop:'-50px', paddingBottom:'25px'}}>Popular Movie</h2>
            <h3 className="" style={{ fontSize: '22px', fontWeight: '600', marginTop: '-70px', paddingBottom: '25px', textAlign: 'right', color: '#D90811' }}>
              See All Movies <BsArrowRight style={{ marginLeft: '5px', fontSize: '20px' }} />
            </h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleSearchChange}
          style={{borderRadius: '999px', borderColor: '#D90811', color: '#000'}}/>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
  {movies.map((movie) => (
    <div key={movie.id} className="col">
      {/* Use Link to navigate to the movie details page */}
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <div className="card h-100" style={{ border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="card-img-top"
            alt={movie.title}
          />
          <div className="card-body">
            <h5 className="card-title" style={{ textDecoration: 'none' }}>{movie.title}</h5>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>


      </div>
    </div>
    </div>
    
  );
};

export default Home;
