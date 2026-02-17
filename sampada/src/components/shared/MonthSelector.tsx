import { AppSelect } from "./AppSelect";

interface MonthSelectorProps {
  value: string;
  onChange: (value: string) => void;
  months: string[];
}

export function MonthSelector({ value, onChange, months }: MonthSelectorProps) {
  return (
    <AppSelect
      value={value}
      onChange={onChange}
      options={months.map((month) => ({ value: month, label: month }))}
      className="h-10 min-w-44 px-6"
    />
  );
}
