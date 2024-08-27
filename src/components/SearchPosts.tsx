import React, { useState, FormEvent } from 'react';

interface SearchPostsProps {
  onSearch: (query: string) => void;
}

/**
 * SearchPosts component to search for posts.
 * @param {SearchPostsProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const SearchPosts: React.FC<SearchPostsProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="search-posts">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Posts"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchPosts;
