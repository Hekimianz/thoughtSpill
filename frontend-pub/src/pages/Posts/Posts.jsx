import { useState, useEffect, useRef } from "react";
import { getPosts } from "../../api/posts";
import BookCard from "../../components/BookCard/BookCard";
import styles from "./Posts.module.css";
function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const fetchedPosts = await getPosts(search);
      setPosts(fetchedPosts);
      setLoading(false);
    }, 300);
    console.log(posts);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  return (
    <section className={styles.postsCont}>
      <input
        type="text"
        placeholder="Book title"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <hr />

      <section className={styles.booksCont}>
        {loading ? (
          <span className={styles.loader}></span>
        ) : (
          posts && posts.map((post) => <BookCard key={post.id} post={post} />)
        )}
      </section>
    </section>
  );
}

export default Posts;
