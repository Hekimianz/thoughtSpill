import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [email, setEmail] = useState("");
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
          setEmail(e.target.value);
        }}
        value={email}
        type="email"
        className={styles.input}
        placeholder="Email"
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
      <input
        onChange={(e) => {
          setPasswordConf(e.target.value);
        }}
        value={passwordConf}
        type="password"
        className={styles.input}
        placeholder="Confirm Password"
      />
      <button className={styles.button}>Register</button>

      <p>
        Already have an account? Sign in{" "}
        <Link className={styles.link} to="/sign-in">
          here!
        </Link>
      </p>
    </form>
  );
}

export default Register;
