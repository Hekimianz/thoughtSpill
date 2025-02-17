import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getUsername } from "../../api/posts";
import { format } from "date-fns";
import styles from "./Comment.module.css";

function Comment({ comment }) {
  const [username, setUsername] = useState(null);
  const formatDate = (isoString) => {
    return format(new Date(isoString), "dd/MM HH:mm");
  };

  let id = comment.userId;

  useEffect(() => {
    const fetchUsername = async (id) => {
      let name = await getUsername(id);
      setUsername(name);
    };
    fetchUsername(id);
  }, []);

  return (
    <section className={styles.comment}>
      <div className={styles.username}>
        <div>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          {username}
          <span className={styles.date}>{formatDate(comment.created_at)}</span>
        </div>
      </div>
      <p>{comment.text}</p>
    </section>
  );
}

export default Comment;
