"use client";

export type FilterValues = {
  category: string;
  color: string;
  price: string;
  tag: string;
  search: string;
};

type FilterBarProps = {
  categories: string[];
  colors: string[];
  prices: string[];
  tags: string[];
  values: FilterValues;
  onFilter: (filters: Partial<FilterValues>) => void;
};

export default function FilterBar({
  categories,
  colors,
  prices,
  tags,
  values,
  onFilter,
}: FilterBarProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-inner shadow-black/50">
      <div className="grid gap-4 md:grid-cols-5">
        <FilterSelect
          label="Category"
          options={categories}
          value={values.category}
          onChange={(value) => onFilter({ category: value })}
        />
        <FilterSelect
          label="Color"
          options={colors}
          value={values.color}
          onChange={(value) => onFilter({ color: value })}
        />
        <FilterSelect
          label="Price"
          options={prices}
          value={values.price}
          onChange={(value) => onFilter({ price: value })}
        />
        <FilterSelect
          label="Style"
          options={tags}
          value={values.tag}
          onChange={(value) => onFilter({ tag: value })}
        />
        <TextInput
          label="Search"
          placeholder="Search name or description"
          value={values.search}
          onChange={(value) => onFilter({ search: value })}
        />
      </div>
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
};

function FilterSelect({ label, options, value = "", onChange }: FilterSelectProps) {
  return (
    <label className="space-y-1 text-xs uppercase tracking-[0.4em] text-slate-400">
      <span>{label}</span>
      <select
        onChange={(event) => onChange(event.target.value)}
        value={value}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white transition focus:border-amber-300"
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-950 text-white">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type TextInputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
};

function TextInput({ label, placeholder = "", value = "", onChange }: TextInputProps) {
  return (
    <label className="space-y-1 text-xs uppercase tracking-[0.4em] text-slate-400">
      <span>{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white transition focus:border-amber-300"
      />
    </label>
  );
}
