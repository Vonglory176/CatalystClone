export default function Filters({ filters, onFilterChange }) {
  return (
    <div>
      {filters.map(filter => (
        <div key={filter.name}>
          <input
            type="checkbox"
            checked={filter.checked}
            onChange={() => onFilterChange(filter.name)}
          />
          <label>{filter.name} ({filter.count})</label>
        </div>
      ))}
    </div>
  );
}