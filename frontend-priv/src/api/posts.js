const API_BASE_URL = "http://localhost:3000/api";

export const getPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status ${response.status}`
      );
    }
    const posts = await response.json();

    return posts.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
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
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // VERY IMPORTANT for JSON
      },
      credentials: "include",
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status ${response.status}`
      );
    }
    const book = await response.json();
    return book.book;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
