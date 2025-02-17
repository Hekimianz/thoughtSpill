import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignIn.module.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={styles.signin__cont}
    >
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        type="text"
        className={styles.input}
        placeholder="Username"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        type="password"
        className={styles.input}
        placeholder="Password"
      />
      <button className={styles.button}>Sign In</button>

      <p>
        Don't have an account? Register{" "}
        <Link className={styles.link} to="/register">
          here!
        </Link>
      </p>
    </form>
  );
}

export default SignIn;
