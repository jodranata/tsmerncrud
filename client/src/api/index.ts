import axios from 'axios';

const postsUrl = `http://localhost:8000/posts`;

export const fetchPosts = () => axios.get(postsUrl);
