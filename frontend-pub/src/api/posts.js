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

    return posts.reverse();
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
};
