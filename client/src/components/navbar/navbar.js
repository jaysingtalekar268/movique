import { Container, Nav } from "react-bootstrap";
import "./navbar.css"

function Navbar() {

    return (
        <Container fluid={true} className="navbar_container">
            <ul className="navbar_ul">
                <li className="navbar_li">
                    <img src={require("../images/logo.png")} className="company_logo img-fluid img-thumbnail"></img>
                </li>
                <li className="navbar_li">
                    <span>Upcoming</span>
                </li>
                <li className="navbar_li">
                    <span>Latest</span>
                </li>
                <li className="navbar_li">
                    <span>popular</span>
                </li>
                <li className="navbar_li">
                    <span>Trending</span>
                </li>
                <li className="navbar_li">
                    <span>Search</span>
                </li>
            </ul>
        </Container>
    );
}

export default Navbar;