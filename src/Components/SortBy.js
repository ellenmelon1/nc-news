const SortBy = ({ setSortBy }) => {
  return (
    <form>
      <label htmlFor="sortBy" className="ph3">
        Sort by:
      </label>
      <select
        name="sortBy"
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
      >
        <option value="created_at">Date</option>
        <option value="comment_count">Comments</option>
        <option value="votes">Votes</option>
      </select>
    </form>
  );
};

export default SortBy;
