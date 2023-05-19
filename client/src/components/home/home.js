import { Container, Row, Col, Card, CardGroup } from "react-bootstrap";
import "./home.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {

    const [movieData, setMData] = useState("");
    const [genresData, setGData] = useState("");

    const api_flag = useRef(true);

    const navigate = useNavigate();

    const get_movie = async () => {
        let movie_result = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=db75be3f6da59e6c54d0b9f568d19d16", {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }

        });

        movie_result = await movie_result.json();

        if (movie_result) {
            api_flag.current = false;
            setMData(movie_result);
        }
        console.warn(movie_result);
    };
    const get_genres = async () => {
        let genres_result = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=db75be3f6da59e6c54d0b9f568d19d16", {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }

        });

        genres_result = await genres_result.json();

        if (genres_result) {
            setGData(genres_result);
            console.warn(genres_result.genres.find(gen => gen.id == 16).name);

        }
    };

    useEffect(() => {
        if (api_flag.current) {
            // api_flag.current = false;
            // alert("api getting called")

            get_movie();
            get_genres();
        }
    });

    const UpcomingMovieSection = () => {

        if (movieData) {
            return (
                <>
                    <Container fluid={true} className="card_group">
                        {movieData.results.map(movie =>

                            <div className="card  card_container" onClick={() => navigate("/movie", { state: { selecredMovieData: movie } })}>
                                <img className="img-fluid card_img " src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie image" />
                                <div className="card_text_div">
                                    <span className="card_text title">{movie.title}</span>

                                    {genresData.genres ? movie.genre_ids.map(gen_id =>
                                        <span className="card_text">{genresData.genres.find(gen => gen.id == gen_id).name}</span>
                                    )
                                        : <span className="card_text">getting genres</span>}
                                    <span className="card_text">{movie.release_date}</span>
                                    <span className="card_text overview">{movie.overview}</span>
                                </div>
                            </div>
                        )}
                    </Container>
                </>
            );
        }
        else {
            return (<>
                <span>loading movies</span>
            </>);
        }
    }

    const PopularMovieSection = () => {

        if (movieData) {
            return (
                <>
                    <CardGroup>
                        {movieData.results.map(movie =>
                            <Card style={{ width: '18rem' }} onClick={() => navigate("/movie", { state: { selecredMovieData: movieData.results[0] } })}>
                                <Card.Img variant="top" src="https://image.tmdb.org/t/p/w500/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg" alt="movie image" />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Title>{movie.genre_ids[0]}</Card.Title>
                                    <Card.Title>{movie.popularity}</Card.Title>
                                    <Card.Text>{movie.overview}</Card.Text>
                                </Card.Body>
                            </Card>)}
                    </CardGroup>
                </>
            );
        }
        else {
            return (<>
                <span>loading movies</span>
            </>);
        }
    }

    const TopRatedMovieSection = () => {

        if (movieData) {
            return (
                <>

                    {movieData.results.map(movie =>
                        <Card style={{ width: '18rem' }} onClick={() => navigate("/movie", { state: { selecredMovieData: movieData.results[0] } })}>
                            <Card.Img variant="top" src="https://image.tmdb.org/t/p/w500/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg" alt="movie image" />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Title>{movie.genre_ids[0]}</Card.Title>
                                <Card.Title>{movie.vote_count}</Card.Title>
                                <Card.Title>{movie.vote_average}</Card.Title>
                                <Card.Text>{movie.overview}</Card.Text>
                            </Card.Body>
                        </Card>)}

                </>
            );
        }
        else {
            return (<>
                <span>loading movies</span>
            </>);
        }
    }


    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <UpcomingMovieSection></UpcomingMovieSection>

                </Col>
            </Row>
            <Row>
                <Col>
                    {/* <PopularMovieSection></PopularMovieSection> */}
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* <TopRatedMovieSection></TopRatedMovieSection> */}
                </Col>
            </Row>

        </Container>
    );
}

export default Home;