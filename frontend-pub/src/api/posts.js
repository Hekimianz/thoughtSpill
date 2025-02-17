const base_url = import.meta.env.VITE_API_BASE_URL;
export const getPosts = async (searchTerm = "") => {
  try {
    let url = `${base_url}/api/posts`;
    if (searchTerm) {
      url += `?title=${encodeURIComponent(searchTerm)}`;
    }
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status ${response.status}`
      );
    }
    const { posts } = await response.json();

    return posts.filter((post) => post.published).reverse();
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};

export const getPost = async (id) => {
  try {
    let url = `${base_url}/api/posts/${id}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status ${response.status}`
      );
    }
    const { post } = await response.json();
    return post;
  } catch (err) {
    console.error("Error fetching post:", err);
    throw err;
  }
};

export const getComments = async (id) => {
  try {
    let url = `${base_url}/api/posts/comments/${id}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status ${response.status}`
      );
    }
    const { comments } = await response.json();
    return comments;
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw err;
  }
};

export const getUsername = async (id) => {
  try {
    let url = `${base_url}/api/user/${id}`;

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const { user } = await response.json();
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postComment = async (text, userId, id) => {
  try {
    let url = `${base_url}/api/posts/comments/${id}`;

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
    });
    const { comment } = await response.json();
    return comment;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
