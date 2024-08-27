import { useState, useEffect } from 'react';

interface PostData {
  _id: string;
  title: string;
  message: string;
  timestamp: Date;
}

/**
 * Custom hook to manage posts state and related operations.
 * @returns An object containing posts data and related functions.
 */
const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState(0);
  const [failed, setFailed] = useState(0);
  const [queueSize, setQueueSize] = useState(0);
//   const token = localStorage.getItem('token'); 
  const token = '78b2f09143640c300969f1fb98fc0a158715de522c67318888c35a75feb17ff01a513978d9324e0d7e106f2d29887041d3c0eccbb34ae2aef92b90e5cf64892e';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data: PostData[] = await response.json();
        setPosts(data);
        setTotal(data.length);
      } catch (error) {
        console.error('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  const createPost = async (post: Omit<PostData, '_id' | 'timestamp'>) => {
    setQueueSize((prev) => prev + 1);
    try {
      console.log('Creating post with data:', post); // Log the post data
  
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(post),
      });
  
      if (!response.ok) {
        console.error('Failed to create post with status:', response.status);
        setFailed((prev) => prev + 1);
        setQueueSize((prev) => prev - 1);
        return;
      }
  
      const newPost: PostData = await response.json();
      setPosts((prev) => [...prev, newPost]);
      setSuccess((prev) => prev + 1);
      setQueueSize((prev) => prev - 1);
    } catch (error) {
      setFailed((prev) => prev + 1);
      setQueueSize((prev) => prev - 1);
      console.error('Failed to create post:', error);
    }
  };
  
  const resetState = () => {
    setPosts([]);
    setTotal(0);
    setSuccess(0);
    setFailed(0);
    setQueueSize(0);
  };

  const searchPosts = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts?query=${query}`);
      const data: PostData[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to search posts');
    }
  };

  return { posts, total, success, failed, queueSize, createPost, resetState, searchPosts };
};

export default usePosts;



