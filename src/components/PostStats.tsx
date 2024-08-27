import React from 'react';

interface PostStatsProps {
  state: {
    total: number;
    success: number;
    failed: number;
    queueSize: number;
    posts: PostData[];
  };
}

interface PostData {
  title: string;
  message: string;
  timestamp: Date;
  _id: string;
}

/**
 * PostStats component to display statistics of posts.
 * @param {PostStatsProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const PostStats: React.FC<PostStatsProps> = ({ state }) => {
  return (
    <div className="post-stats">
      <p>Total Posts Attempted: {state.total}</p>
      <p>Successful Posts: {state.success}</p>
      <p>Failed Posts: {state.failed}</p>
      <p>Queue Size: {state.queueSize}</p>
      <p>Posts in MongoDB: {state.posts.length}</p>
    </div>
  );
};

export default PostStats;
