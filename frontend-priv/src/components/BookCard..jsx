import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

function BookCard({
  title,
  cover_url,
  created_at,
  published,
  thoughts,
  type,
  id,
}) {
  return (
    <Link
      to={`/post/${id}`}
      className={`${styles.bookCard__cont} ${
        published ? styles.published : styles.unpublished
      }`}
    >
      <img className={styles.cover} src={cover_url} alt="cover" />
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
}

export default BookCard;
