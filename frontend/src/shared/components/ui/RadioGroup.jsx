export const RadioGroup = ({ name, options = [], value, onChange }) => (
  <div className="flex flex-wrap gap-3">
    {options.map((option) => (
      <label key={option} className="inline-flex items-center gap-2 text-sm text-slate-700">
        <input
          type="radio"
          name={name}
          value={option}
          checked={value === option}
          onChange={(event) => onChange(event.target.value)}
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
);
