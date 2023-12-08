import styles from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={styles.nfField}>
            <h1 className={styles.notFoundTxt}>Page not found!</h1>
        </div>
    );
}