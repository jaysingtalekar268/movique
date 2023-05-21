import { Container } from "react-bootstrap";
import styles from "./search.module.css";
import { useEffect, useRef, useState } from "react";
import { XCircle, Search as SearchIcon } from "react-bootstrap-icons";

function Search(props) {

    // const [searchData, setSData] = useState("");
    const [queryData, setQData] = useState("");
    const sflag = useRef(true);


    const searchMovie = async () => {
        // alert(props.searchPage)
        let searchResult = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=db75be3f6da59e6c54d0b9f568d19d16&query=${queryData}&page=${props.searchPage}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });

        searchResult = await searchResult.json();

        if (searchResult.results) {
            sflag.current = false;
            // alert(searchResult.results[0].original_title)
            props.setSData(searchResult);
        }
    };

    useEffect(() => {
        {
            // alert("serch" + props.searchPage)
            if(props.searchPage>=2)
            searchMovie();
        }
    }, [props.searchPage]);

    const searchHandler = () => {
        if (queryData.length == 0) {
            props.setSData(false);
        }
        else {
            searchMovie();
        }
    }

    const cancel = () => {
        props.setSData(false);
        setQData("");
    }
    return (
        <Container fluid={true}>
            <div className={styles.search_div}>
                <span className={styles.search}>
                    <input onChange={(e) => setQData(e.target.value)} value={queryData}></input>
                </span>
                <XCircle className={styles.cancel} onClick={() => cancel()}></XCircle>
                <SearchIcon className={styles.search_btn} onClick={() => searchHandler()}></SearchIcon>


            </div>

        </Container>
    );
}

export default Search;