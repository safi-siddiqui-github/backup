"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DateInputProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DateInput = ({
  value,
  onChange,
  placeholder = "Select a date",
  className,
  disabled = false,
}: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    onChange?.(date);
    setIsOpen(false);
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateSelect}
          initialFocus
          className="pointer-events-auto p-3"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;
