import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authProvider";
import styles from "./Register.module.css";

function Register() {
  const { user, register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      password !== passwordConf ||
      !password ||
      !passwordConf ||
      !email ||
      !username
    ) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [password, passwordConf, email, username]);

  if (user) {
    navigate("/");
    return;
  }
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await register(username, email, password);
        navigate("/sign-in");
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
      <button disabled={invalid} className={styles.button}>
        Register
      </button>

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
