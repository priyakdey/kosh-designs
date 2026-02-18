import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface AppSelectOption {
  value: string;
  label: string;
}

interface AppSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: readonly AppSelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function AppSelect({
  value,
  onChange,
  options,
  placeholder,
  className,
  disabled,
}: AppSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          "w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 h-11",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
