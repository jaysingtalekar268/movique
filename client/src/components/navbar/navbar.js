import { Container, Nav } from "react-bootstrap";
import "./navbar.css"
import { useState } from "react";

function Navbar() {

    const [fix, setFix] = useState(false);

    const sticky = () => {
        if (window.scrollY >= 70) {
            setFix(true);

        }
        else {
            setFix(false);
        }
    };

    window.addEventListener("scroll", sticky);

    return (
        <Container fluid={true} className={fix ? "navbar_container navbar_container_fixed" : "navbar_container"}>


            <ul className="navbar_ul">

                <li className="navbar_li">
                    <div className="logo_div">
                        <a href=""><img src={require("../images/logo-white-crop.png")} className="test company_logo img-fluid "></img>
                        </a>
                    </div>
                </li>

                <li className="navbar_li">
                    <a className="navbar_link" href="">Upcoming</a>
                </li>
                <li className="navbar_li">
                    <a className="navbar_link" href="">Upcoming</a>
                </li>
            </ul>
        </Container>
    );
}

export default Navbar;