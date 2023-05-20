import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./movie.css";

function Movie() {

    const [movieData, setMData] = useState();

    const location = useLocation();

    // const api_
    // const get_movie=async ()=>{

    //     let movieResult = await fetch("",{
    //         method:"GET",
    //         headers:{
    //             'Content-type':'application/json'
    //         }
    //     });

    //     movieResult = await movieResult.json();

    //     if(movieResult)
    //     {
    //         setMData(movieResult);
    //     }
    // }

    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <div>
                        <div className="poster_div" style={{
                         background: `url(https://image.tmdb.org/t/p/original/${location.state.selecredMovieData.poster_path})`
                         }}> 
                        {/* <img className=" poster" src={`https://image.tmdb.org/t/p/original/${location.state.selecredMovieData.poster_path}`} alt="movie image"></img> */}
                        </div> 

                        {/* <div className="poster_div">
                            <img className=" poster" src={`https://image.tmdb.org/t/p/original/${location.state.selecredMovieData.poster_path}`} alt="movie image"></img>
                        </div> */}

                        <div>
                            <span className="movie_details">{location.state.selecredMovieData.original_language}</span>
                            <span className="movie_details title">{location.state.selecredMovieData.title}</span>
                            <span className="movie_details">{location.state.selecredMovieData.overview}</span>
                            <span className="movie_details">{location.state.selecredMovieData.popularity}</span>
                            <span className="movie_details">{location.state.selecredMovieData.genre_ids}</span>
                            {location.state.genresData.genres ? location.state.selecredMovieData.genre_ids.map(gen_id =>
                                <span className="movie_details">{location.state.genresData.genres.find(gen => gen.id == gen_id).name}</span>
                            )
                                : <span className="movie_details">getting genres</span>}
                            <span className="movie_details">{location.state.selecredMovieData.release_data}</span>
                            <span className="movie_details">{location.state.selecredMovieData.vote_count}</span>
                            <span className="movie_details">{location.state.selecredMovieData.vote_average}</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Movie;