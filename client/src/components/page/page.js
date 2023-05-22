import { Container } from "react-bootstrap";
import styles from "./page.module.css";

function Page(props) {
    const uCounter = props.counter;
    const movieUData = props.data;

    return (
        <>
            <div className={styles.page_div}>
                {(uCounter) != 1 ? <span className={styles.current_page}>{1}..</span> : ""}
                {(uCounter - 3) > 3 ? <span className={styles.current_page}>{uCounter - 3}</span> : ""}
                {(uCounter - 2) > 2 ? <span className={styles.current_page}>{uCounter - 2}</span> : ""}
                {(uCounter - 1) > 1 ? <span className={styles.current_page}>{uCounter - 1}</span> : ""}

                <span className={`${styles.current_page} ${styles.active_page}`}>   {uCounter}</span>
                {(uCounter + 1) < movieUData.total_pages - 1 ? <span className={styles.current_page}>{uCounter + 1}</span> : ""}
                {(uCounter + 2) < movieUData.total_pages - 2 ? <span className={styles.current_page}>{uCounter + 2}</span> : ""}
                {(uCounter + 3) < movieUData.total_pages - 3 ? <span className={styles.current_page}>{uCounter + 3}</span> : ""}
                {(uCounter) != movieUData.total_pages ? <span className={styles.current_page}>..{movieUData.total_pages}</span> : ""}
            </div>
        </>
    );
}

export default Page;