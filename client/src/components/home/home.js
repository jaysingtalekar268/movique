import { Container, Row, Col } from "react-bootstrap";
import styles from "./home.module.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../page/page";

function Home(props) {

    const [moviePData, setMPData] = useState("");
    const [movieUData, setMUData] = useState("");
    const [movieTData, setMTData] = useState("");

    const [genresData, setGData] = useState("");

    const [pCounter, setPCounter] = useState(1);
    const [uCounter, setUCounter] = useState(2);
    const [tCounter, setTCounter] = useState(1);
    const [sCounter, setSCounter] = useState(1);

    const pflag = useRef(true);
    const uflag = useRef(true);
    const tflag = useRef(true);

    const navigate = useNavigate();

    const getPopMovie = async () => {
        let movie_result = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=db75be3f6da59e6c54d0b9f568d19d16&page=${pCounter}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }

        });

        movie_result = await movie_result.json();

        if (movie_result) {
            pflag.current = false;

            setMPData(movie_result);
        }
        // console.warn(movie_result);
    };
    const getUpMovie = async () => {
        let movie_result = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=db75be3f6da59e6c54d0b9f568d19d16&page=${uCounter}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }

        });

        movie_result = await movie_result.json();

        if (movie_result) {
            uflag.current = false;
            setMUData(movie_result);
        }
        // console.warn(movie_result);
    };
    const getTopMovie = async () => {
        let movie_result = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=db75be3f6da59e6c54d0b9f568d19d16&page=${uCounter}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }

        });

        movie_result = await movie_result.json();

        if (movie_result) {
            tflag.current = false;
            setMTData(movie_result);
        }
        // console.warn(movie_result);
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
            // console.warn(genres_result.genres.find(gen => gen.id == 16).name);

        }
    };
    useEffect(() => {
        // alert(sCounter)
        props.setSPage(sCounter);
    }, [sCounter]);

    useEffect(() => {
        if (pflag.current) {
            // api_flag.current = false;
            // alert("api getting called")

            getPopMovie();
            get_genres();
        }
        if (uflag.current) {
            // api_flag.current = false;
            // alert("api getting called")

            getUpMovie();
        }
        if (tflag.current) {
            // api_flag.current = false;
            // alert("api getting called")

            getTopMovie();
        }
    });

    useEffect(() => {
        getUpMovie();
    }, [uCounter]);

    const handleUPage = (pageStatus) => {
        if (uCounter == movieUData.total_pages && pageStatus == false) {
            return setUCounter(1);
        }
        else if (uCounter == 1 && pageStatus == true) {
            return setUCounter(movieUData.total_pages);
        }

        if (pageStatus) {
            setUCounter(uCounter - 1);

        }
        else {
            setUCounter(uCounter + 1);
        }
    }
    const handlePPage = (pageStatus) => {
        if (pCounter == moviePData.total_pages && pageStatus == false) {
            return setPCounter(1);
        }
        else if (pCounter == 1 && pageStatus == true) {
            return setPCounter(moviePData.total_pages);
        }

        if (pageStatus) {
            setPCounter(pCounter - 1);

        }
        else {
            setPCounter(pCounter + 1);
        }
    }
    const handleTPage = (pageStatus) => {
        if (tCounter == movieTData.total_pages && pageStatus == false) {
            return setTCounter(1);
        }
        else if (tCounter == 1 && pageStatus == true) {
            return setTCounter(movieTData.total_pages);
        }

        if (pageStatus) {
            setTCounter(uCounter - 1);

        }
        else {
            setUCounter(uCounter + 1);
        }
    }
    const handleSPage = (pageStatus) => {
        if (sCounter == props.searchData.total_pages && pageStatus == false) {
            return setSCounter(1);
        }
        else if (sCounter == 1 && pageStatus == true) {
            return setSCounter(props.searchData.total_pages);
        }

        if (pageStatus) {
            setSCounter(sCounter - 1);

        }
        else {
            setSCounter(sCounter + 1);
        }
    }

    const UpcomingMovieSection = () => {

        if (movieUData) {
            return (
                <>
                    <Container fluid={true} className={styles.card_group}>
                        {movieUData.results.map((movie, index) =>

                            <div className={`card  ${styles.card_container}`} key={index} onClick={() => navigate("/movie", { state: { selecredMovieData: movie, genresData } })}>
                                <div className={styles.card_poster}>
                                    <img className={`img-fluid ${styles.card_img}`} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie image" />
                                </div>


                                <div className={styles.main_text_div}>
                                    <div className={styles.card_text_div}>
                                        <span className={`${styles.card_text} ${styles.title}`}>{movie.title}</span>

                                        <span className={`${styles.card_text} ${styles.genres_text}`}>
                                            {genresData.genres ? movie.genre_ids.map((gen_id,index2) =>
                                                <span key={index2}>
                                                    | {genresData.genres.find(gen => gen.id == gen_id).name} |
                                                </span>
                                            )
                                                : <span className={`${styles.card_text}`}>getting genres</span>}
                                        </span>


                                        <span className={`${styles.card_text}`}>{movie.release_date}</span>
                                        <span className={`${styles.card_text} ${styles.label}`}>Overview</span>
                                        <span className={`${styles.card_text} ${styles.overview}`}>{movie.overview}</span>
                                    </div>                                </div>
                            </div>
                        )}
                    </Container>
                    <Container>

                        <div className={styles.pagination_div}>

                            <button className={styles.page_btn} onClick={() => handleUPage(true)}> Prev</button>
                            <Page data={movieUData} counter={uCounter}></Page>
                            <button className={styles.page_btn} onClick={() => handleUPage(false)}>Next </button>
                        </div>
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

        if (moviePData) {
            return (
                <>
                    <Container fluid={true} className={styles.card_group}>
                        {moviePData.results.map((movie, index) =>

                            <div className={`card  ${styles.card_container}`} key={index} onClick={() => navigate("/movie", { state: { selecredMovieData: movie, genresData } })}>
                                <div className={styles.card_poster}>
                                    <img className={`img-fluid ${styles.card_img}`} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie image" />
                                </div>


                                <div className={styles.main_text_div}>
                                    <div className={styles.card_text_div}>
                                        <span className={`${styles.card_text} ${styles.title}`}>{movie.title}</span>

                                        <span className={`${styles.card_text} ${styles.genres_text}`}>
                                            {genresData.genres ? movie.genre_ids.map((gen_id,index2) =>
                                                <span key={index2}>
                                                    | {genresData.genres.find(gen => gen.id == gen_id).name} |
                                                </span>
                                            )
                                                : <span className={`${styles.card_text}`}>getting genres</span>}
                                        </span>

                                        <span className={`${styles.card_text}`}>Popularity {movie.popularity}</span>
                                        <span className={`${styles.card_text} ${styles.label}`}>Overview</span>
                                        <span className={`${styles.card_text} ${styles.overview}`}>{movie.overview}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Container>
                    <Container>

                        <div className={styles.pagination_div}>

                            <button className={styles.page_btn} onClick={() => handlePPage(true)}> Prev</button>
                            <Page data={moviePData} counter={pCounter}></Page>
                            <button className={styles.page_btn} onClick={() => handlePPage(false)}>Next </button>
                        </div>
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

    const TopRatedMovieSection = () => {

        if (movieTData) {
            return (
                <>
                    <Container fluid={true} className={styles.card_group}>
                        {movieTData.results.map((movie, index) =>

                            <div className={`card  ${styles.card_container}`} key={index} onClick={() => navigate("/movie", { state: { selecredMovieData: movie, genresData } })}>
                                <div className={styles.card_poster}>
                                    <img className={`img-fluid ${styles.card_img}`} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie image" />
                                </div>


                                <div className={styles.main_text_div}>
                                    <div className={styles.card_text_div}>
                                        <span className={`${styles.card_text} ${styles.title}`}>{movie.title}</span>

                                        <span className={`${styles.card_text} ${styles.genres_text}`}>
                                            {genresData.genres ? movie.genre_ids.map((gen_id,index2) =>
                                                <span key={index2}>
                                                    | {genresData.genres.find(gen => gen.id == gen_id).name} |
                                                </span>
                                            )
                                                : <span className={`${styles.card_text}`}>getting genres</span>}
                                        </span>
                                        <span className={`${styles.card_text}`}>VOTE COUNT {movie.vote_count}</span>
                                        <span className={`${styles.card_text}`}>VOTE AVERAGE {movie.vote_average}</span>
                                        <span className={`${styles.card_text} ${styles.label}`}>Overview</span>
                                        <span className={`${styles.card_text} ${styles.overview}`}>{movie.overview}</span>

                                    </div>
                                </div>
                            </div>
                        )}
                    </Container>
                    <Container>

                        <div className={styles.pagination_div}>

                            <button className={styles.page_btn} onClick={() => handleTPage(true)}> Prev</button>
                            <Page data={movieTData} counter={tCounter}></Page>
                            <button className={styles.page_btn} onClick={() => handleTPage(false)}>Next </button>
                        </div>
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

    const DisplayHandler = () => {
        if (props.searchData == false) {
            return (
                <Container fluid={true} >
                    <Row>
                        <Col id="upcoming">
                            <div className={styles.section}>
                                <span >UPCOMING </span>
                            </div>
                            <UpcomingMovieSection></UpcomingMovieSection>

                        </Col>
                    </Row>
                    <Row>
                        <Col id="popular">
                            <div className={styles.section}>
                                <span >POPULAR </span>
                            </div>
                            <PopularMovieSection></PopularMovieSection>

                        </Col>
                    </Row>
                    <Row>
                        <Col id="top-rated">
                            <div className={styles.section}>
                                <span >TOP RATED MOVIES</span>
                            </div>
                            <TopRatedMovieSection></TopRatedMovieSection>
                        </Col>
                    </Row>


                </Container>
            );
        }
        else {
            if (props.searchData.total_results == 0) {
                return (
                    <Container>
                        <Row>
                            <Col>
                                <span>
                                    NO result found
                                </span>
                            </Col>
                        </Row>
                    </Container>
                );
            }
            else {
                return (
                    <>
                        <Container fluid={true} className={styles.card_group}>
                            {props.searchData.results.map((movie, index) =>

                                <div className={`card  ${styles.card_container}`} key={index} onClick={() => navigate("/movie", { state: { selecredMovieData: movie, genresData } })}>
                                    <div className={styles.card_poster}>
                                        <img className={`img-fluid ${styles.card_img}`} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie image" />
                                    </div>


                                    <div className={styles.main_text_div}>
                                        <div className={styles.card_text_div}>
                                            <span className={`${styles.card_text} ${styles.title}`}>{movie.title}</span>

                                            <span className={`${styles.card_text} ${styles.genres_text}`}>
                                                {genresData.genres ? movie.genre_ids.map(gen_id =>
                                                    <span >
                                                        | {genresData.genres.find(gen => gen.id == gen_id).name} |
                                                    </span>
                                                )
                                                    : <span className={`${styles.card_text}`}>getting genres</span>}
                                            </span>


                                            <span className={`${styles.card_text}`}>{movie.release_date}</span>
                                            <span className={`${styles.card_text} ${styles.label}`}>Overview</span>
                                            <span className={`${styles.card_text} ${styles.overview}`}>{movie.overview}</span>
                                        </div>                                </div>
                                </div>
                            )}
                        </Container>
                        <div className={styles.pagination_div}>

                            <button className={styles.page_btn} onClick={() => handleSPage(true)}> Prev</button>
                            <Page data={props.searchData} counter={sCounter}></Page>
                            <button className={styles.page_btn} onClick={() => handleSPage(false)}>Next </button>
                        </div>
                    </>
                );
            }


        }
    };

    return (
        // <>
        //  {alert( props.searchData)}
        // <p>{console.warn("s",props.searchData)}
        // </p>
        // </>  
        // <p>{props.searchData ? alert(props.searchData.results) : ""}  </p>


        // <Container fluid={true} >
        //     <Row>
        //         <Col id="upcoming">
        //             <div className={styles.section}>
        //                 <span >UPCOMING </span>
        //             </div>
        //             <UpcomingMovieSection></UpcomingMovieSection>

        //         </Col>
        //     </Row>
        //     <Row>
        //         <Col id="popular">
        //             <div className={styles.section}>
        //                 <span >POPULAR </span>
        //             </div>
        //             <PopularMovieSection></PopularMovieSection>

        //         </Col>
        //     </Row>
        //     <Row>
        //         <Col id="top-rated">
        //             <div className={styles.section}>
        //                 <span >TOP RATED MOVIES</span>
        //             </div>
        //             <TopRatedMovieSection></TopRatedMovieSection>
        //         </Col>
        //     </Row>


        // </Container>
        <DisplayHandler></DisplayHandler>
    );
}

export default Home;