import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../contexts/authProvider";
import { getPosts } from "../api/posts";

function Header({ search, setSearch, setPosts, setLoadingPosts }) {
  const { user, logout } = useAuth();
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingPosts(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setLoadingPosts(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    async function fetchPosts() {
      if (debouncedSearch) {
        try {
          const posts = await getPosts(debouncedSearch);
          console.log(posts);
          setPosts(posts);
          navigate("/");
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      } else {
        try {
          const posts = await getPosts();
          setPosts(posts);
        } catch (error) {}
      }
    }

    fetchPosts();
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update the search state immediately
  };

  return (
    <section className={styles.header__cont}>
      <Link to="/" className={styles.logo__cont}>
        <img className={styles.logo} src="/logo__transparent.png" alt="logo" />
        <h1 className={styles.logo__text}>ThoughtSpill</h1>
      </Link>
      {user && (
        <input
          className={styles.search}
          placeholder="title"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
      )}
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
