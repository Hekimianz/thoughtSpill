import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getPost, updatePost, deletePost } from "../api/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { isEqual } from "lodash";
import styles from "./Post.module.css";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [confDelete, setConfDelete] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    deletePost(id);
    navigate("/");
  };

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
        <span className={styles.trashIcon}>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              setConfDelete(true);
            }}
          />
        </span>
        {confDelete && (
          <div className={styles.delete__cont__overlay}>
            <div className={styles.delete__cont}>
              <span className={styles.closeIcon}>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => {
                    setConfDelete(false);
                  }}
                />
              </span>
              <p>Are you sure you want to delete this book?</p>
              <div>
                <button
                  onClick={() => {
                    setConfDelete(false);
                  }}
                >
                  No
                </button>
                <button
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
        <form className={styles.update__form}>
          {updateError && <p style={{ color: "red" }}>{updateError}</p>}{" "}
          <ul>
            <li>
              <label htmlFor="pages" className={styles.bold}>
                Pages:
              </label>
              <input
                id="pages"
                name="pages"
                type="text"
                className={styles.update__input}
                value={updatedBook.pages || ""}
                onChange={(e) => {
                  setUpdatedBook({
                    ...updatedBook,
                    pages: parseInt(e.target.value, 10),
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
                value={updatedBook.date_published || ""}
                onChange={(e) => {
                  setUpdatedBook({
                    ...updatedBook,
                    date_published: e.target.value,
                  });
                }}
                disabled={isUpdating}
              />
            </li>

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
              <label htmlFor="isbn" className={styles.bold}>
                ISBN:
              </label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                className={styles.update__input}
                value={updatedBook.isbn || ""}
                onChange={(e) => {
                  setUpdatedBook({ ...updatedBook, isbn: e.target.value });
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
