import { useState } from 'react';

const SortBy = () => {
  const [sortBy, setSortBy] = useState('');
  return (
    <form>
      <select
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
      >
        <option selected="selected" disabled hidden>
          Sort by
        </option>
        <option value="all">all</option>
        <option value="date">date</option>
        <option value="comment_count">comment count</option>
        <option value="votes">votes</option>
      </select>
    </form>
  );
};

export default SortBy;
