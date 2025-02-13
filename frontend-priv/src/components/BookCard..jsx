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
    <div
      className={`${styles.bookCard__cont} ${
        published ? styles.published : styles.unpublished
      }`}
    >
      <img className={styles.cover} src={cover_url} alt="cover" />
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}

export default BookCard;
