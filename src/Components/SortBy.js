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
        <option value="all">None</option>
        <option value="created_at">date</option>
        <option value="comment_count">comment count</option>
        <option value="votes">votes</option>
      </select>
    </form>
  );
};

export default SortBy;
