import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import styles from "./movie.module.css";
import hstyles from "../home/home.module.css";
import Page from "../page/page";


function Movie() {

    const navigate = useNavigate();
    const [reviewData, setRData] = useState();
    const [similarData, setSData] = useState();

    const [sCounter, setSCounter] = useState(1);
    const [sLoad, setSLoad] = useState(false);

    const location = useLocation();

    const rflag = useRef(true);
    const sflag = useRef(true);
    const get_review = async () => {

        let reviewResult = await fetch(`https://api.themoviedb.org/3/movie/${location.state.selecredMovieData.id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });

        reviewResult = await reviewResult.json();

        if (reviewResult) {
            rflag.current = false;
            setRData(reviewResult);
        }
    }
    const get_similar = async () => {

        let similarResult = await fetch(`https://api.themoviedb.org/3/movie/${location.state.selecredMovieData.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&page=${sCounter}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });

        similarResult = await similarResult.json();

        if (similarResult) {
            sflag.current = false;
            setSData(similarResult);
        }
    }

    useEffect(() => {
        if (location.state) {
            if (rflag.current) {
                get_review();

            }

            if (sflag.current) {
                get_similar();

            }


        }
        window.scrollTo({top: 50, left: 0, behavior: 'smooth'});
        const timeout = setTimeout(() => {
            window.scrollTo({top: 300, left: 0, behavior: 'smooth'});
          }, 5000)

    });

    useEffect(() => {
        get_similar();
    }, [sCounter]);

    useEffect(() => {
        get_similar();

    }, [sLoad]);

    const similarHandler = (movie) => {

        setSLoad(true);
        navigate("/movie", { state: { selecredMovieData: movie, genresData: location.state.genresData } });
        window.scrollTo({top: 50, left: 0, behavior: 'smooth'});
    };

    const handleSPage = (pageStatus) => {
        if (sCounter == similarData.total_pages && pageStatus == false) {
            return setSCounter(1);
        }
        else if (sCounter == 1 && pageStatus == true) {
            return setSCounter(similarData.total_pages);
        }

        if (pageStatus) {
            setSCounter(sCounter - 1);

        }
        else {
            setSCounter(sCounter + 1);
        }
    }

    const UserReview = () => {

        if (reviewData) {
            return (
                <div className={styles.card_group} >
                    {
                        reviewData.results.map((review, index) =>
                            <div className={styles.card_container} key={index} >
                                <div className={styles.card_text_div}>
                                    <span className={styles.card_text}>{review.author_details.name ? review.author_details.name : review.author_details.username}</span>
                                </div>
                                <div>
                                    <img src={review.author_details.avatar_path} alt={review.author_details.name}></img>

                                </div>
                                <div className={styles.card_text_div}>
                                    <span className={styles.card_text}>{review.content}</span>
                                    <span className={styles.card_text}>{new Date(review.created_at).getDate()}/{new Date(review.created_at).getMonth()}/{new Date(review.created_at).getFullYear()} </span>
                                </div>
                            </div>
                        )}
                </div>
            );
        }
        else {
            return (
                <>
                    <span>
                        Getting user Reviews
                    </span>
                </>
            );
        }
    };

    const SimilarMovies = () => {
        if (similarData) {
            return (
                <>
                    <Container fluid={true} className={hstyles.card_group}>
                        {similarData.results.map((movie, index) =>

                            <div className={`card  ${hstyles.card_container}`} key={index} onClick={() => similarHandler(movie)}>
                                <div className={hstyles.card_poster}>
                                    <img className={`img-fluid ${hstyles.card_img}`} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie image" />
                                </div>

                                <div className={hstyles.main_text_div}>
                                    <div className={hstyles.card_text_div}>
                                        <span className={`${hstyles.card_text} ${hstyles.title}`}>{movie.title}</span>

                                        <span className={`${hstyles.card_text} ${hstyles.genres_text}`}>
                                            {location.state.genresData.genres ? movie.genre_ids.map((gen_id, index2) =>
                                                <span key={index2}>
                                                    | {location.state.genresData.genres.find(gen => gen.id == gen_id).name} |
                                                </span>
                                            )
                                                : <span className={`${hstyles.card_text}`}>getting genres</span>}
                                        </span>


                                        <span className={`${hstyles.card_text}`}>{movie.release_date}</span>
                                        <span className={`${hstyles.card_text} ${hstyles.overview}`}>{movie.overview}</span>
                                    </div>                                </div>
                            </div>
                        )}
                    </Container>
                    <Container>

                        <div className={hstyles.pagination_div}>

                            <button className={hstyles.page_btn} onClick={() => handleSPage(true)}> Prev</button>
                            <Page data={similarData} counter={sCounter}></Page>
                            <button className={hstyles.page_btn} onClick={() => handleSPage(false)}>Next </button>
                        </div>
                    </Container>
                </>
            );
        }
        else {
            return (
                <>
                    <span>
                        Getting Similar Movies
                    </span>
                </>
            );
        }
    };

    const CheckLocation = () => {
        if (location.state) {
            return (

                <Container fluid={true}>
                    <Row>
                        <Col>
                            <div className={styles.main_div} >
                                <div className={styles.poster_div} style={{ background: `url(https://image.tmdb.org/t/p/original/${location.state.selecredMovieData.poster_path}`, backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "100% 100%" }}>

                                </div>

                            </div>

                            <div className={styles.text_div}>
                                <span className={`${styles.movie_text} ${styles.title}`}>{location.state.selecredMovieData.title}  </span>
                                <span className={styles.movie_text}>{location.state.selecredMovieData.original_language}  </span>

                                <span className={`${styles.movie_text} ${styles.genres_text}`}> Genres{location.state.genresData.genres ? location.state.selecredMovieData.genre_ids.map((gen_id, index2) =>
                                    <span key={index2} className=""> | {location.state.genresData.genres.find(gen => gen.id == gen_id).name} | </span>
                                )
                                    : <span className="">getting genres</span>}</span>
                                <span className={styles.movie_text}>{location.state.selecredMovieData.overview}  </span>
                                <span className={styles.movie_text}> <span className={styles.label}>Popularity </span>{location.state.selecredMovieData.popularity}  </span>
                                <span className={styles.movie_text}> <span className={styles.label}>Release Date </span>{location.state.selecredMovieData.release_date}  </span>
                                <span className={styles.movie_text}> <span className={styles.label}>Vote Count </span>{location.state.selecredMovieData.vote_count}  </span>
                                <span className={styles.movie_text}> <span className={styles.label}>Vote Average </span>{location.state.selecredMovieData.vote_average}  </span>


                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className={styles.user_review}>
                                <span >User Reviews </span>
                            </div>

                            <UserReview></UserReview>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className={styles.user_review}>
                                <span >Similar Movies </span>
                            </div>

                            <SimilarMovies></SimilarMovies>
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {

            return <Navigate to="/"></Navigate>


        }
    }


    return (
        <CheckLocation></CheckLocation>


    );
}

export default Movie;