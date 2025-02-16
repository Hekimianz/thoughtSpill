import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <section className={styles.notFound}>
      <img src="/404.png" className={styles.img} alt="404 Page Not Found" />
    </section>
  );
}

export default NotFound;
