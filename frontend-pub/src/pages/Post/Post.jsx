import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getPost, getComments, postComment } from "../../api/posts";
import { useAuth } from "../../contexts/authProvider";
import Comment from "../../components/Comment/Comment";
import styles from "./Post.module.css";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [thoughtsOpen, setThoughtsOpen] = useState(false);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const fetchedPost = await getPost(id);
      setPost(fetchedPost);
    };
    const fetchComments = async () => {
      if (!id) return;
      const fetchedComments = await getComments(id);
      setComments(fetchedComments);
    };
    fetchPost();
    fetchComments();
  }, [id]);

  const handlePostComment = async () => {
    if (!newComment.trim()) {
      return;
    }

    try {
      const comment = await postComment(newComment.trim(), user.id, id);
      setComments((prev) => [comment, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <section className={styles.post__cont}>
      {!post ? (
        <span className={styles.loader}></span>
      ) : (
        <>
          <img className={styles.cover} src={post.cover_url} alt="Book cover" />
          <div className={styles.book__details}>
            <h2 className={styles.title}>{post.title}</h2>
            <h2 className={styles.author}>{post.author}</h2>

            <ul>
              <li>
                <span className={styles.bold}>Date Published:</span>
                {post.date_published}
              </li>
              <li>
                <span className={styles.bold}>Pages:</span>
                {post.pages}
              </li>
              <li>
                <span className={styles.bold}>Dates Read:</span>
                {post.date_read}
              </li>
              <li>
                <span className={styles.bold}>ISBN:</span>
                {post.isbn}
              </li>
              <li>
                <span className={styles.bold}>
                  Thoughts:{" "}
                  <FontAwesomeIcon
                    icon={thoughtsOpen ? faChevronUp : faChevronDown}
                    className={styles.icon}
                    onClick={(e) => {
                      setThoughtsOpen((prev) => !prev);
                    }}
                  />
                </span>
                <hr />
              </li>
            </ul>

            <div
              className={`${styles.thoughts} ${
                thoughtsOpen ? styles.open : ""
              }`}
              dangerouslySetInnerHTML={{ __html: post.thoughts }}
            />
          </div>
          <div className={styles.comments__cont}>
            <span className={styles.subtitle}>Comments</span>
            <hr />
            {comments?.length >= 1 ? (
              comments?.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))
            ) : (
              <span className={styles.emptyComments}>
                No one's chimed in yet—go ahead and start the discussion!
              </span>
            )}
          </div>
          {!user && (
            <div className={styles.noUser}>
              <Link to="/sign-in" className={styles.link}>
                Sign in
              </Link>
              or{" "}
              <Link to="/register" className={styles.link}>
                register
              </Link>
              to create comments!
            </div>
          )}
          {user && (
            <div className={styles.createComment}>
              <textarea
                name="comment"
                id="comment"
                placeholder="Post comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handlePostComment} className={styles.button}>
                Post
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Post;
