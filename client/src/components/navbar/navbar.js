import { Container } from "react-bootstrap";
import styles from "./navbar.module.css"
import { useEffect, useState } from "react";
import Search from "../search/search";
import { List } from "react-bootstrap-icons"
function Navbar(props) {

    const [fix, setFix] = useState(false);



    const [menuState, setMState] = useState(true);

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

    const setMenu = () => {
        if (menuState) {
            setMState(false);
        }
        else {
            setMState(true);
        }
    };

    return (
        <Container fluid={true} className={fix ? `${styles.navbar_container} ${styles.navbar_container_fixed}` : `${styles.navbar_container}`}>
            <div className={styles.logo_div}>
                <a href="/"><img src={require("../images/logo-white-crop.png")} className={`${styles.test} ${styles.company_logo} img-fluid`} alt="movique"></img>
                </a>
            </div>
            <div className={styles.menu_div}>
                <List className={styles.menu_icon} onClick={() => setMenu()}></List>

            </div>
            {menuState &&
                <ul className={styles.navbar_ul}>

                    {/* <li className={styles.navbar_li}>
                        <div className={styles.logo_div}>
                            <a href="/"><img src={require("../images/logo-white-crop.png")} className={`${styles.test} ${styles.company_logo} img-fluid`} alt="movique"></img>
                            </a>
                        </div>
                    </li> */}

                    <li className={styles.navbar_li}>
                        <a className={styles.navbar_link} href="#upcoming">Upcoming Movies</a>
                    </li>
                    <li className={styles.navbar_li}>
                        <a className={styles.navbar_link} href="#popular">Popular Movies</a>
                    </li>
                    <li className={styles.navbar_li}>
                        <a className={styles.navbar_link} href="#top-rated">Top-Rated Movies</a>
                    </li>
                    <li className={`${styles.navbar_li} ${styles.search}`}>
                        <Search setSData={props.setSRData} searchPage={props.searchPage}></Search>
                    </li>
                </ul>
            }
        </Container>
    );
}

export default Navbar;