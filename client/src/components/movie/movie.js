import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import styles from "./movie.module.css";
import { TextCenter } from "react-bootstrap-icons";



function Movie() {

    const navigate = useNavigate();
    const [reviewData, setRData] = useState();

    const location = useLocation();

    const api_flag = useRef(true);
    const get_review = async () => {

        let reviewResult = await fetch(`https://api.themoviedb.org/3/movie/${location.state.selecredMovieData.id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });

        reviewResult = await reviewResult.json();

        if (reviewResult) {
            api_flag.current = false;
            // console.warn(reviewResult);
            setRData(reviewResult);
        }
    }

    useEffect(() => {
        if (location.state && api_flag.current) {
            get_review();
        }

    });

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
                                <span className={styles.movie_text}>{location.state.selecredMovieData.popularity}  </span>
                                <span className={styles.movie_text}>Release Date {location.state.selecredMovieData.release_date}  </span>

                                <span className={styles.movie_text}>{location.state.selecredMovieData.vote_count}  </span>
                                <span className={styles.movie_text}>{location.state.selecredMovieData.vote_average}  </span>
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
                </Container>
            );
        }
        else {
            // alert("here")
            // return (<Container>
            //     <Row>
            //         <Col>
            //             <span className={styles.redirect}>Redirecting you to home page </span>
            //         </Col>
            //     </Row>

            // </Container>
            //);
            return <Navigate to="/"></Navigate>


        }
    }


    return (
        <CheckLocation></CheckLocation>
        // <Container fluid={true}>
        //     <Row>
        //         <Col>
        //             <div className={styles.main_div} >
        //                 <div className={styles.poster_div} style={{ background: `url(https://image.tmdb.org/t/p/original/${location.state.selecredMovieData.poster_path}`, backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "100% 100%" }}>

        //                 </div>

        //             </div>

        //             <div className={styles.text_div}>
        //                 <span className={`${styles.movie_text} ${styles.title}`}>{location.state.selecredMovieData.title}  </span>
        //                 <span className={styles.movie_text}>{location.state.selecredMovieData.original_language}  </span>

        //                 <span className={`${styles.movie_text} ${styles.genres_text}`}> Genres{location.state.genresData.genres ? location.state.selecredMovieData.genre_ids.map(gen_id =>
        //                     <span className=""> | {location.state.genresData.genres.find(gen => gen.id == gen_id).name} | </span>
        //                 )
        //                     : <span className="">getting genres</span>}</span>
        //                 <span className={styles.movie_text}>{location.state.selecredMovieData.overview}  </span>
        //                 <span className={styles.movie_text}>{location.state.selecredMovieData.popularity}  </span>
        //                 <span className={styles.movie_text}>Release Date {location.state.selecredMovieData.release_date}  </span>

        //                 <span className={styles.movie_text}>{location.state.selecredMovieData.vote_count}  </span>
        //                 <span className={styles.movie_text}>{location.state.selecredMovieData.vote_average}  </span>
        //             </div>
        //         </Col>
        //     </Row>

        //     <Row>
        //         <Col>
        //             <div className={styles.user_review}>
        //                 <span >User Reviews </span>
        //             </div>

        //             <UserReview></UserReview>
        //         </Col>
        //     </Row>
        // </Container>
    );
}

export default Movie;