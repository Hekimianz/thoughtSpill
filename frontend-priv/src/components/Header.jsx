import styles from "./Header.module.css";
function Header() {
  return (
    <section className={styles.header__cont}>
      <img className={styles.logo} src="/logo__transparent.png" alt="logo" />
      <h1 className={styles.logo__text}>ThoughtSpill</h1>
    </section>
  );
}

export default Header;
