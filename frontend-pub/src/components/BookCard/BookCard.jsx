import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

function BookCard({ post }) {
  const { title, cover_url } = post;
  return (
    <Link to={`/post/${post.id}`} className={styles.bookCard__cont}>
      <img className={styles.cover} src={cover_url} alt="book cover" />
      <h2>{title}</h2>
    </Link>
  );
}

export default BookCard;
