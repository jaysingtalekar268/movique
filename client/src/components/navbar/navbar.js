import { Container, Nav } from "react-bootstrap";
import "./navbar.css"
import { useEffect, useState } from "react";
import Search from "../search/search";


function Navbar(props) {

    const [fix, setFix] = useState(false);

    const [searchResult, setSData] = useState("");

    const sticky = () => {
        if (window.scrollY >= 70) {
            setFix(true);

        }
        else {
            setFix(false);
        }
    };
    useEffect(() => {
        // alert("navbar"+props.searchPage)
    }, [props.searchPage]);
    window.addEventListener("scroll", sticky);

    return (
        <Container fluid={true} className={fix ? "navbar_container navbar_container_fixed" : "navbar_container"}>


            <ul className="navbar_ul">

                <li className="navbar_li">
                    <div className="logo_div">
                        <a href="/"><img src={require("../images/logo-white-crop.png")} className="test company_logo img-fluid "></img>
                        </a>
                    </div>
                </li>

                <li className="navbar_li">
                    <a className="navbar_link" href="#upcoming">Upcoming Movies</a>
                </li>
                <li className="navbar_li">
                    <a className="navbar_link" href="#popular">Popular Movies</a>
                </li>
                <li className="navbar_li">
                    <a className="navbar_link" href="#top-rated">Top-Rated Movies</a>
                </li>
                <li className="navbar_li">
                    <Search setSData={props.setSRData} searchPage={props.searchPage}></Search>
                </li>
            </ul>
        </Container>
    );
}

export default Navbar;