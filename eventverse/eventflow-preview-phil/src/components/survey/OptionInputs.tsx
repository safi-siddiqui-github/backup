import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, CalendarClock, Type, X, Plus } from "lucide-react";
import DateInput from "./DateInput";
import { format } from "date-fns";

interface OptionValue {
  label: string;
  value: string | Date;
}

interface OptionInputsProps {
  optionType: 'text' | 'date' | 'time' | 'datetime';
  options: OptionValue[];
  onOptionsChange: (options: OptionValue[]) => void;
  onOptionTypeChange: (type: 'text' | 'date' | 'time' | 'datetime') => void;
}

const OptionInputs = ({ optionType, options, onOptionsChange, onOptionTypeChange }: OptionInputsProps) => {
  const optionTypes = [
    { value: 'text', label: 'Text Options', icon: Type, description: 'Traditional text choices' },
    { value: 'date', label: 'Date Options', icon: Calendar, description: 'Pick from different dates' },
    { value: 'time', label: 'Time Options', icon: Clock, description: 'Pick from different times' },
    { value: 'datetime', label: 'Date & Time Options', icon: CalendarClock, description: 'Pick from date-time combinations' }
  ];

  const addOption = () => {
    const newOption: OptionValue = {
      label: '',
      value: optionType === 'text' ? '' : new Date()
    };
    onOptionsChange([...options, newOption]);
  };

  const updateOption = (index: number, updates: Partial<OptionValue>) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], ...updates };
    onOptionsChange(newOptions);
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      onOptionsChange(options.filter((_, i) => i !== index));
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const createTimeFromString = (timeStr: string): Date => {
    const today = new Date();
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let adjustedHours = hours;
    if (period?.toLowerCase() === 'pm' && hours !== 12) {
      adjustedHours += 12;
    } else if (period?.toLowerCase() === 'am' && hours === 12) {
      adjustedHours = 0;
    }
    
    today.setHours(adjustedHours, minutes, 0, 0);
    return today;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm">Option Type</Label>
        <Select value={optionType} onValueChange={(value) => onOptionTypeChange(value as any)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {optionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Options</Label>
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Input
                placeholder={`Option ${index + 1} label`}
                value={option.label}
                onChange={(e) => updateOption(index, { label: e.target.value })}
              />
              
              {optionType === 'text' && (
                <Input
                  placeholder="Option value (optional)"
                  value={option.value as string}
                  onChange={(e) => updateOption(index, { value: e.target.value })}
                />
              )}
              
              {optionType === 'date' && (
                <DateInput
                  value={option.value as Date}
                  onChange={(date) => updateOption(index, { value: date || new Date() })}
                  placeholder="Select date"
                />
              )}
              
              {optionType === 'time' && (
                <Input
                  type="time"
                  value={option.value instanceof Date ? format(option.value, 'HH:mm') : ''}
                  onChange={(e) => {
                    const timeValue = e.target.value;
                    if (timeValue) {
                      const [hours, minutes] = timeValue.split(':').map(Number);
                      const date = new Date();
                      date.setHours(hours, minutes, 0, 0);
                      updateOption(index, { value: date });
                    }
                  }}
                />
              )}
              
              {optionType === 'datetime' && (
                <div className="grid grid-cols-2 gap-2">
                  <DateInput
                    value={option.value as Date}
                    onChange={(date) => updateOption(index, { value: date || new Date() })}
                    placeholder="Select date"
                  />
                  <Input
                    type="time"
                    value={option.value instanceof Date ? format(option.value, 'HH:mm') : ''}
                    onChange={(e) => {
                      const timeValue = e.target.value;
                      if (timeValue && option.value instanceof Date) {
                        const [hours, minutes] = timeValue.split(':').map(Number);
                        const newDate = new Date(option.value);
                        newDate.setHours(hours, minutes, 0, 0);
                        updateOption(index, { value: newDate });
                      }
                    }}
                  />
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeOption(index)}
              disabled={options.length <= 1}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <Button variant="outline" size="sm" onClick={addOption}>
          <Plus className="w-4 h-4 mr-2" />
          Add Option
        </Button>
      </div>

      {/* Preview */}
      <div className="p-3 border rounded bg-muted/50">
        <Label className="text-xs text-muted-foreground mb-2 block">Preview:</Label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 border border-muted-foreground rounded-full"></div>
              <span>
                {option.label || `Option ${index + 1}`}
                {optionType === 'date' && option.value instanceof Date && 
                  ` (${format(option.value, 'PPP')})`
                }
                {optionType === 'time' && option.value instanceof Date && 
                  ` (${formatTime(option.value)})`
                }
                {optionType === 'datetime' && option.value instanceof Date && 
                  ` (${format(option.value, 'PPP')} at ${formatTime(option.value)})`
                }
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptionInputs;