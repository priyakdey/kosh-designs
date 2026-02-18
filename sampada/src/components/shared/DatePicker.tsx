import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  /** ISO date string (yyyy-MM-dd) or empty string */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled,
}: DatePickerProps) {
  const selected = value
    ? parse(value, "yyyy-MM-dd", new Date())
    : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800",
            "hover:bg-gray-50 dark:hover:bg-gray-700",
            "focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            !value && "text-gray-400 dark:text-gray-500",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
          {selected ? format(selected, "dd MMM yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            onChange(date ? format(date, "yyyy-MM-dd") : "");
          }}
          defaultMonth={selected}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
