import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../contexts/authProvider";

function Header() {
  const { user, logout } = useAuth();

  return (
    <section className={styles.header__cont}>
      <Link to="/" className={styles.logo__cont}>
        <img className={styles.logo} src="/logo__transparent.png" alt="logo" />
        <h1 className={styles.logo__text}>ThoughtSpill</h1>
      </Link>
      {user && (
        <Link to="/add-post" className={`${styles.button} ${styles.addBtn}`}>
          Add Post
        </Link>
      )}
      {user && (
        <button className={styles.button} onClick={logout}>
          Logout
        </button>
      )}
    </section>
  );
}

export default Header;
