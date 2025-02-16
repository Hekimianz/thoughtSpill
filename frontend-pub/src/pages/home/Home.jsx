import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.home__cont}>
      <h2>
        Welcome to <span className={styles.stylized}>ThoughtSpill</span>!
      </h2>

      <div className={styles.inner__cont}>
        <img className={styles.welcomeImg} src="/stackBooks.jpg" alt="" />

        <div className={styles.secondInner__cont}>
          <p className={styles.paragraph}>
            A no-nonsense space where I spill my thoughts on the books I read.
            No ratings, no deep analysis—just my honest{" "}
            <span className={styles.bold}>opinions</span>.
          </p>

          <button className={styles.button}>
            <Link to="/about">More info</Link>
          </button>
        </div>
      </div>

      <div className={styles.inner__cont}>
        <img className={styles.welcomeImg} src="/bookCoffee.jpg" alt="" />

        <div className={styles.secondInner__cont}>
          <p className={styles.paragraph}>
            Ready to dive deeper? Check out the posts to see my full
            <span className={styles.bold}> thoughts</span> on the books I’ve
            read. Whether you agree or disagree, it’s all here.
          </p>

          <button className={styles.button}>
            <Link to="/posts">See Posts</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
