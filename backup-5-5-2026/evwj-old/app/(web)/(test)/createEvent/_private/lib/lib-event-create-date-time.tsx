import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { EventFormData } from "../types/types";


type DateTimeProps ={
    formData: EventFormData;
    onUpdate: (updates: Partial<EventFormData>) => void;
}

type DateMode = "single" | "multiday" | "recurring";

type DaySession = {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
};

export default function LibDateTime({ formData, onUpdate }: DateTimeProps)   {
    const [mode, setMode] = useState<DateMode>(
        formData.recurrence.isRecurring
            ? "recurring"
            : formData.eventDates.isMultiDay
                ? "multiday"
                : "single",
    );

    // Sync mode with formData changes
    useEffect(() => {
        const newMode: DateMode = formData.recurrence.isRecurring
            ? "recurring"
            : formData.eventDates.isMultiDay
                ? "multiday"
                : "single";
        setMode(newMode);
    }, [formData.recurrence.isRecurring, formData.eventDates.isMultiDay]);

    // Initialize days from formData.sessions if available, otherwise from startDate
    const [days, setDays] = useState<DaySession[]>(() => {
        if (
            formData.eventDates.sessions &&
            formData.eventDates.sessions.length > 0
        ) {
            return formData.eventDates.sessions.map((session, idx) => ({
                id: session.id || idx.toString(),
                date: session.date,
                startTime: session.startTime,
                endTime: session.endTime,
            }));
        }
        return [
            {
                id: "1",
                date: formData.eventDates.startDate || new Date(),
                startTime: formData.eventDates.startTime || "10:00",
                endTime: formData.eventDates.endTime || "16:00",
            },
        ];
    });

    const handleDateChange = (date: Date | undefined) => {
        if (!date) return;

        onUpdate({
            eventDates: {
                ...formData.eventDates,
                startDate: date,
            },
        });

        if (mode === "single") {
            setDays([{ ...days[0], date }]);
        }
    };

    const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
        onUpdate({
            eventDates: {
                ...formData.eventDates,
                [field]: value,
            },
        });
    };

    const handleTimezoneChange = (timezone: string) => {
        onUpdate({
            eventDates: {
                ...formData.eventDates,
                timezone,
            },
        });
    };

    const switchToMultiDay = () => {
        setMode("multiday");
        onUpdate({
            eventDates: {
                ...formData.eventDates,
                isMultiDay: true,
            },
            recurrence: {
                ...formData.recurrence,
                isRecurring: false,
            },
        });
    };

    const switchToSingle = () => {
        setMode("single");
        onUpdate({
            eventDates: {
                ...formData.eventDates,
                isMultiDay: false,
                sessions: [],
            },
            recurrence: {
                ...formData.recurrence,
                isRecurring: false,
            },
        });
    };

    const switchToRecurring = () => {
        setMode("recurring");
        onUpdate({
            eventDates: {
                ...formData.eventDates,
                isMultiDay: false,
                sessions: [],
            },
            recurrence: {
                ...formData.recurrence,
                isRecurring: true,
            },
        });
    };

    const updateDay = (id: string, updates: Partial<DaySession>) => {
        const updatedDays = days.map((d) =>
            d.id === id ? { ...d, ...updates } : d,
        );
        setDays(updatedDays);

        // Update formData with sessions
        if (mode === "multiday") {
            onUpdate({
                eventDates: {
                    ...formData.eventDates,
                    sessions: updatedDays.map((day) => ({
                        id: day.id,
                        date: day.date,
                        title: "",
                        startTime: day.startTime,
                        endTime: day.endTime,
                        locationId: undefined,
                        description: "",
                    })),
                },
            });
        }
    };

    const handleAddDay = () => {
        const newDay: DaySession = {
            id: Date.now().toString(),
            date: new Date(),
            startTime: "10:00",
            endTime: "16:00",
        };
        const updatedDays = [...days, newDay];
        setDays(updatedDays);

        onUpdate({
            eventDates: {
                ...formData.eventDates,
                sessions: updatedDays.map((day) => ({
                    id: day.id,
                    date: day.date,
                    title: "",
                    startTime: day.startTime,
                    endTime: day.endTime,
                    locationId: undefined,
                    description: "",
                })),
            },
        });
    };

    const handleRemoveDay = (id: string) => {
        if (days.length > 1) {
            const updatedDays = days.filter((d) => d.id !== id);
            setDays(updatedDays);

            onUpdate({
                eventDates: {
                    ...formData.eventDates,
                    sessions: updatedDays.map((day) => ({
                        id: day.id,
                        date: day.date,
                        title: "",
                        startTime: day.startTime,
                        endTime: day.endTime,
                        locationId: undefined,
                        description: "",
                    })),
                },
            });
        }
    };

    return (
        <div className="space-y-4">
            {/* Single Day Mode */}
            {mode === "single" && (
                <>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Event Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "h-10 w-full justify-start",
                                            !formData.eventDates.startDate && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.eventDates.startDate
                                            ? format(formData.eventDates.startDate, "MMM dd, yyyy")
                                            : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.eventDates.startDate || undefined}
                                        onSelect={handleDateChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label>Time Zone</Label>
                            <Select
                                value={formData.eventDates.timezone}
                                onValueChange={handleTimezoneChange}
                            >
                                <SelectTrigger className="h-10 w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UTC">UTC</SelectItem>
                                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                                    <SelectItem value="America/Los_Angeles">
                                        Pacific Time
                                    </SelectItem>
                                    <SelectItem value="Europe/London">London</SelectItem>
                                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Time *</Label>
                            <Input
                                type="time"
                                className="h-10"
                                value={formData.eventDates.startTime || "10:00"}
                                onChange={(e) => handleTimeChange("startTime", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Time</Label>
                            <Input
                                type="time"
                                className="h-10"
                                value={formData.eventDates.endTime || "16:00"}
                                onChange={(e) => handleTimeChange("endTime", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={switchToMultiDay}
                            className="border-2"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add multiple days
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={switchToRecurring}
                            className="border-2"
                        >
                            Make recurring
                        </Button>
                    </div>
                </>
            )}

            {/* Multi-Day Mode */}
            {mode === "multiday" && (
                <>
                    <div className="space-y-2">
                        <Label>Time Zone (applies to all days)</Label>
                        <Select
                            value={formData.eventDates.timezone}
                            onValueChange={handleTimezoneChange}
                        >
                            <SelectTrigger className="h-10 w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UTC">UTC</SelectItem>
                                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                                <SelectItem value="America/Chicago">Central Time</SelectItem>
                                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                                <SelectItem value="America/Los_Angeles">
                                    Pacific Time
                                </SelectItem>
                                <SelectItem value="Europe/London">London</SelectItem>
                                <SelectItem value="Europe/Paris">Paris</SelectItem>
                                <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {days.map((day, index) => (
                        <Card
                            key={day.id}
                            className="border !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className="grid flex-1 grid-cols-3 gap-3">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Date</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-9 w-full justify-start"
                                                    >
                                                        <CalendarIcon className="mr-2 h-3 w-3" />
                                                        {format(day.date, "MMM dd")}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={day.date}
                                                        onSelect={(date) =>
                                                            date && updateDay(day.id, { date })
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Start</Label>
                                            <Input
                                                type="time"
                                                className="h-9"
                                                value={day.startTime}
                                                onChange={(e) =>
                                                    updateDay(day.id, { startTime: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">End</Label>
                                            <Input
                                                type="time"
                                                className="h-9"
                                                value={day.endTime}
                                                onChange={(e) =>
                                                    updateDay(day.id, { endTime: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    {days.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveDay(day.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" onClick={handleAddDay}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add another day
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={switchToSingle}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-sm"
                        >
                            Switch to Single Day
                        </Button>
                    </div>
                </>
            )}

            {/* Recurring Mode */}
            {mode === "recurring" && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "h-10 w-full justify-start",
                                            !formData.eventDates.startDate && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.eventDates.startDate
                                            ? format(formData.eventDates.startDate, "MMM dd, yyyy")
                                            : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.eventDates.startDate || undefined}
                                        onSelect={handleDateChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label>Time *</Label>
                            <Input
                                type="time"
                                className="h-10"
                                value={formData.eventDates.startTime || "10:00"}
                                onChange={(e) => handleTimeChange("startTime", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Repeats</Label>
                        <Select
                            value={formData.recurrence.pattern}
                            onValueChange={(value) =>
                                onUpdate({
                                    recurrence: { ...formData.recurrence, pattern: value as any },
                                })
                            }
                        >
                            <SelectTrigger className="h-10">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                        {formData.recurrence.pattern === "custom" && (
                            <div className="flex items-center gap-2 pt-2">
                                <span className="text-sm text-muted-foreground">Every</span>
                                <Input
                                    type="number"
                                    min="1"
                                    className="h-9 w-20"
                                    placeholder="1"
                                    value={formData.recurrence.frequency || 1}
                                    onChange={(e) =>
                                        onUpdate({
                                            recurrence: {
                                                ...formData.recurrence,
                                                frequency: parseInt(e.target.value) || 1,
                                            },
                                        })
                                    }
                                />
                                <Select
                                    value={formData.recurrence.customPattern || "weeks"}
                                    onValueChange={(value) =>
                                        onUpdate({
                                            recurrence: {
                                                ...formData.recurrence,
                                                customPattern: value as any,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger className="h-9 w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="days">Days</SelectItem>
                                        <SelectItem value="weeks">Weeks</SelectItem>
                                        <SelectItem value="months">Months</SelectItem>
                                        <SelectItem value="years">Years</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Ends</Label>
                        <RadioGroup
                            value={formData.recurrence.endType}
                            onValueChange={(value) =>
                                onUpdate({
                                    recurrence: { ...formData.recurrence, endType: value as any },
                                })
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="never" id="never" />
                                <Label htmlFor="never" className="font-normal">
                                    Never
                                </Label>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="until" id="until" />
                                    <Label htmlFor="until" className="font-normal">
                                        On date
                                    </Label>
                                </div>
                                {formData.recurrence.endType === "until" && (
                                    <div className="ml-6">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "h-9 w-full justify-start",
                                                        !formData.recurrence.endValue &&
                                                            "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {formData.recurrence.endValue
                                                        ? format(
                                                                formData.recurrence.endValue as Date,
                                                                "MMM dd, yyyy",
                                                            )
                                                        : "Select end date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={
                                                        formData.recurrence.endValue
                                                            ? (formData.recurrence.endValue as Date)
                                                            : undefined
                                                    }
                                                    onSelect={(date) =>
                                                        onUpdate({
                                                            recurrence: {
                                                                ...formData.recurrence,
                                                                endValue: date || undefined,
                                                            },
                                                        })
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="after" id="after" />
                                    <Label htmlFor="after" className="font-normal">
                                        After [n] occurrences
                                    </Label>
                                </div>
                                {formData.recurrence.endType === "after" && (
                                    <div className="ml-6">
                                        <Input
                                            type="number"
                                            min="1"
                                            className="h-9 w-32"
                                            placeholder="Number"
                                            value={
                                                typeof formData.recurrence.endValue === "number"
                                                    ? formData.recurrence.endValue
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                onUpdate({
                                                    recurrence: {
                                                        ...formData.recurrence,
                                                        endValue: parseInt(e.target.value) || undefined,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={switchToMultiDay}
                            className="border-2"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add multiple days
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={switchToSingle}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-sm"
                        >
                            Switch to Single Day
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

 
