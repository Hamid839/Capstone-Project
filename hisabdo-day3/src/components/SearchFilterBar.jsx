/**
 * SearchFilterBar
 * A controlled inputs component for searching by name and filtering by
 * course. All state lives in the parent (App) — this component just
 * receives values + setter functions as props ("lifting state up").
 */
function SearchFilterBar({
  searchTerm,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
  courseOptions,
  onReset,
}) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="🔍 Search by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        value={courseFilter}
        onChange={(e) => onCourseFilterChange(e.target.value)}
      >
        <option value="">All Courses</option>
        {courseOptions.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>

      <button type="button" className="reset-btn" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default SearchFilterBar;
