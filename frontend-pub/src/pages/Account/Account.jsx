import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authProvider";
import styles from "./Account.module.css";

function Account() {
  const { user } = useAuth();

  return (
    <section className={styles.account__cont}>
      {!user && (
        <div className={styles.noUser}>
          <img src="/sad.png" className={styles.img} />
          <p>
            You arent signed in!{" "}
            <Link to="/sign-in" className={styles.link}>
              Sign in
            </Link>
            or{" "}
            <Link to="/register" className={styles.link}>
              register
            </Link>
          </p>
        </div>
      )}
    </section>
  );
}

export default Account;
