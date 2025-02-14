import { useAuth } from "../contexts/authProvider";
import { useNavigate } from "react-router-dom";
import styles from "./AddPost.module.css";
import { useState } from "react";
import { addPost } from "../api/posts";

function AddPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover_url, setCover_url] = useState("");
  const [datePub, setDatePub] = useState("");
  const [dateRead, setDateRead] = useState("");
  const [pages, setPages] = useState("");
  const [isbn, setIsbn] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const post = {
      title,
      author,
      cover_url,
      date_published: datePub,
      pages,
      isbn,
      date_read: dateRead,
    };
    await addPost(post);

    try {
    } catch (err) {
      console.error("Error cretaing post:", err);
    } finally {
      navigate("/");
    }
  };
  return user ? (
    <section className={styles.main__cont}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <ul>
          <li>
            <label htmlFor="title" className={styles.bold}>
              Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={styles.update__input}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </li>

          <li>
            <label htmlFor="title" className={styles.bold}>
              Author:
            </label>
            <input
              id="author"
              name="author"
              type="text"
              className={styles.update__input}
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </li>

          <li>
            <label htmlFor="cover_url" className={styles.bold}>
              Cover URL:
            </label>
            <input
              id="cover_url"
              name="cover_url"
              type="text"
              className={styles.update__input}
              value={cover_url}
              onChange={(e) => {
                setCover_url(e.target.value);
              }}
            />
          </li>

          <li>
            <label htmlFor="pages" className={styles.bold}>
              Pages:
            </label>
            <input
              id="pages"
              name="pages"
              type="text"
              className={styles.update__input}
              value={pages}
              onChange={(e) => {
                setPages(e.target.value);
              }}
            />
          </li>

          <li>
            <label htmlFor="datePub" className={styles.bold}>
              Date Pub:
            </label>
            <input
              id="datePub"
              name="datePub"
              type="text"
              className={styles.update__input}
              value={datePub}
              onChange={(e) => {
                setDatePub(e.target.value);
              }}
            />
          </li>

          <li>
            <label htmlFor="date_read" className={styles.bold}>
              Date Read:
            </label>
            <input
              id="date_read"
              name="date_read"
              type="text"
              className={styles.update__input}
              value={dateRead}
              onChange={(e) => {
                setDateRead(e.target.value);
              }}
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
              value={isbn}
              onChange={(e) => {
                setIsbn(e.target.value);
              }}
            />
          </li>
        </ul>
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
    </section>
  ) : (
    navigate("/")
  );
}

export default AddPost;
