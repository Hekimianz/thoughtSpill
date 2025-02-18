import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authProvider";
import styles from "./Account.module.css";

function Account() {
  const { user, deleteAccount, logout } = useAuth();
  const [confDelete, setConfDelete] = useState(null);

  return (
    <section className={styles.account__cont}>
      {confDelete && (
        <div className={styles.confDelete}>
          <p>Are you sure you want to delete your acccount?</p>
          <div>
            <button
              className={styles.button}
              onClick={() => setConfDelete(false)}
            >
              No
            </button>
            <button
              className={styles.button}
              onClick={async () => {
                await deleteAccount(user.id);
                await logout();
                setConfDelete(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      )}
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
      {user && !confDelete && (
        <>
          <h1 className={styles.welcomeText}>Welcome back, {user.username}!</h1>

          <button className={styles.button} onClick={() => setConfDelete(true)}>
            Delete Account
          </button>
        </>
      )}
    </section>
  );
}

export default Account;
