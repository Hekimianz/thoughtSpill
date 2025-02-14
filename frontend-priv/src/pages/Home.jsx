import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authProvider";
import { getPosts } from "../api/posts";
import BookCard from "../components/BookCard";
import styles from "./Home.module.css";
function Home({ posts, setPosts, loadingPosts }) {
  const { user, login, loading: authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError("Failed to fetch posts.");
        console.error(err);
      }
    };
    if (user) {
      fetchPosts();
    }
  }, [user]);

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

  if (authLoading || loadingPosts) {
    return <span className={styles.loader}></span>;
  }

  return (
    <>
      {user ? (
        <div className={styles.userPage__cont}>
          <h2 className={styles.welcome}>Welcome, Aram!</h2>
          <div className={styles.legend__cont}>
            <div className={styles.legend__field}>
              <div className={styles.legend__square}></div>
              <p className={styles.legend__text}>Published</p>
            </div>
            <div className={styles.legend__field}>
              <div className={`${styles.legend__square} ${styles.red}`}></div>
              <p className={styles.legend__text}>Not Published</p>
            </div>
          </div>
          <section className={styles.posts__cont}>
            {posts &&
              posts.map((book) => {
                return (
                  <BookCard
                    key={book.id}
                    title={book.title}
                    cover_url={book.cover_url}
                    created_at={book.created_at}
                    published={book.published}
                    thoughts={book.thoughts}
                    type={book.type}
                    id={book.id}
                  />
                );
              })}
          </section>
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
