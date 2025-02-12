import { useState } from "react";
import { useAuth } from "../contexts/authProvider";
import Header from "../components/Header";
import styles from "./Home.module.css";
function Home() {
  const { user, login, loading: authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      {user ? (
        <div>
          <h2 className={styles.welcome}>Welcome, Aram!</h2>
          {/*  Add content for logged-in users */}
        </div>
      ) : (
        <form className={styles.login__form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          {isLoading && <span className={styles.loader}></span>}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button className={styles.button} type="submit">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
    </>
  );
}

export default Home;
