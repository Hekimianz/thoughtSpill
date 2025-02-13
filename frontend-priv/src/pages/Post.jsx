// src/pages/Post.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/posts"; // Make sure these are correct
import { isEqual } from "lodash";
import styles from "./Post.module.css";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null); // Separate error for updates
  const [isUpdating, setIsUpdating] = useState(false); // Track update in progress

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id);
        setPost(fetchedPost);
        setUpdatedBook({ ...fetchedPost });
      } catch (err) {
        setError(err.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    setIsUpdating(true);

    try {
      if (isEqual(post, updatedBook)) return;
      const updatedPostData = await updatePost(id, updatedBook);
      setPost(updatedPostData);
      setUpdatedBook({ ...updatedPostData });
    } catch (err) {
      setUpdateError(err.message || "Failed to update post");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <span className={styles.loader}></span>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    post && (
      <section className={styles.book__cont}>
        <h1 className={styles.title}>{post.title}</h1>
        <h2 className={styles.author}>{post.author}</h2>
        <img className={styles.cover} src={post.cover_url} alt="cover" />

        <form className={styles.update__form}>
          {updateError && <p style={{ color: "red" }}>{updateError}</p>}{" "}
          {/* Display update errors */}
          <ul>
            <li>
              <label htmlFor="pages" className={styles.bold}>
                Pages:
              </label>
              <input
                id="pages"
                name="pages"
                type="text" // Use type="number" for numeric input
                className={styles.update__input}
                value={updatedBook.pages || ""} // Handle potential undefined
                onChange={(e) => {
                  setUpdatedBook({
                    ...updatedBook,
                    pages: parseInt(e.target.value, 10), // Parse to integer
                  });
                }}
                disabled={isUpdating}
              />
            </li>
            <li>
              <label htmlFor="datePub" className={styles.bold}>
                Date Published:
              </label>
              <input
                id="datePub"
                name="datePub"
                type="text"
                className={styles.update__input}
                value={updatedBook.date_published || ""} // Handle undefined
                onChange={(e) => {
                  setUpdatedBook({
                    ...updatedBook,
                    date_published: e.target.value,
                  });
                }}
                disabled={isUpdating}
              />
            </li>
            {/* ... other input fields (title, author, cover_url) - similarly handle undefined ... */}
            <li>
              <label htmlFor="title" className={styles.bold}>
                Title:
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={styles.update__input}
                value={updatedBook.title || ""}
                onChange={(e) => {
                  setUpdatedBook({ ...updatedBook, title: e.target.value });
                }}
                disabled={isUpdating}
              />
            </li>
            <li>
              <label htmlFor="author" className={styles.bold}>
                Author:
              </label>
              <input
                id="author"
                name="author"
                type="text"
                className={styles.update__input}
                value={updatedBook.author || ""}
                onChange={(e) => {
                  setUpdatedBook({ ...updatedBook, author: e.target.value });
                }}
                disabled={isUpdating}
              />
            </li>
            <li>
              <label htmlFor="cover_url" className={styles.bold}>
                Cover Url:
              </label>
              <input
                id="cover_url"
                name="cover_url"
                type="text"
                className={styles.update__input}
                value={updatedBook.cover_url || ""}
                onChange={(e) => {
                  setUpdatedBook({ ...updatedBook, cover_url: e.target.value });
                }}
                disabled={isUpdating}
              />
            </li>
            <li>
              <label htmlFor="published" className={styles.bold}>
                Published:
              </label>
              <input
                type="checkbox"
                name="published"
                id="published"
                onChange={(e) => {
                  setUpdatedBook({
                    ...updatedBook,
                    published: e.target.checked,
                  });
                }}
                checked={updatedBook.published}
              />
            </li>
          </ul>
          <button
            type="submit"
            onClick={handleUpdate}
            className={styles.button}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </form>
      </section>
    )
  );
}

export default Post;
