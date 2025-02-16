import { Link } from "react-router-dom";
import styles from "./About.module.css";

function About() {
  return (
    <section className={styles.aboutCont}>
      <h1>Reading Books, Forgetting Books, Writing About Books</h1>

      <img className={styles.img} src="/coding.png" alt="" />

      <p className={styles.paragraph}>
        Hey there! I’m Aram Hekimian Guerrero, a 26-year-old software engineer
        from Mexico City who spends way too much time reading books and watching
        movies instead of, you know, touching grass.
      </p>

      <p className={styles.paragraph}>
        <span className={styles.bold}>ThoughtSpill</span> exists because my
        brain refuses to keep track of what I’ve read. But let’s get one thing
        straight: I am not a literary scholar. I have exactly zero credentials
        in the arts, and any analysis you find here is 100% my uneducated
        opinion. If I say something insightful, it's probably an accident. If I
        say something dumb, well, at least I’m consistent.
      </p>

      <p className={styles.paragraph}>
        Also, you won’t find ratings here. No stars, no numbers, no arbitrary
        scoring system. I just say whether I liked something or not. Art isn’t a
        math test, and I refuse to act like I can quantify vibes.
      </p>

      <img className={styles.img} src="/reading.png" alt="" />

      <p className={styles.paragraph}>
        So, if you're here for deep, academically sound critiques… yikes. But if
        you just want to see what a guy with a keyboard and too much curiosity
        thinks about books, welcome aboard.
      </p>

      <Link to="/posts">
        <button className={styles.button}>Go to posts</button>
      </Link>
    </section>
  );
}

export default About;
