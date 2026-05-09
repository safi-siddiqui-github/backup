"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { mockEventsData } from "@/lib/data";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  ArrowBigDownDash,
  ChevronDown,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EventCardTwoComponent from "../card/EventCardTwoComponent";

export default function EventsSectionTwoComponent() {
  //
  const [showFilter, setShowFilter] = useState(false);
  //
  const toggleShowFilterFN = () => {
    setShowFilter(!showFilter);
  };
  //
  useEffect(() => {
    //
    if (window.innerWidth >= 1024) {
      setShowFilter(true);
    }
  }, []);
  //
  return (
    <div className="flex flex-col gap-10 py-10">
      {/*  */}
      {/*  */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        {/*  */}
        <p className="text-2xl font-medium">All Events</p>
        {/*  */}
        <div className="flex flex-col gap-2 md:flex-row">
          {/*  */}
          <Button
            className="text-purple-600"
            variant={"secondary"}
          >
            Date ( Earliest First)
            <ArrowBigDownDash />
          </Button>
          {/*  */}
          <Button className="bg-purple-600">
            {" "}
            <SlidersHorizontal />
            Filters
          </Button>
          {/*  */}
        </div>
        {/*  */}
      </div>
      {/*  */}
      {/*  */}
      <div className="flex flex-col gap-10 lg:relative lg:flex-row lg:items-start lg:gap-4">
        {/*  */}
        {/*  */}
        <div className="flex flex-col gap-4 rounded-xl border p-4 lg:sticky lg:top-10 lg:max-w-xs lg:flex-1">
          {/*  */}
          <div
            className="flex justify-between lg:hidden"
            onClick={toggleShowFilterFN}
          >
            {/*  */}
            <div className="flex gap-2">
              <Filter />
              <p className="">Filters</p>
            </div>
            {/*  */}
            <ChevronDown />
          </div>
          {/*  */}
          {/*  */}
          <div
            className={cn("flex-col gap-8", {
              hidden: !showFilter,
              flex: showFilter,
            })}
          >
            {/*  */}
            <Separator className="lg:hidden" />
            {/*  */}
            <div className="flex flex-col gap-4">
              {/*  */}
              <div className="flex flex-col gap-1">
                <p className="text-lg font-medium">Category</p>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Food</SelectItem>
                    <SelectItem value="dark">Sports</SelectItem>
                    <SelectItem value="system">Wedding</SelectItem>
                  </SelectContent>
                </Select>
                {/*  */}
              </div>
              {/*  */}
              <div className="flex flex-col gap-1">
                <p className="text-lg font-medium">Date</p>
                <Input type="date" />
                {/*  */}
              </div>
              {/*  */}
              <div className="flex flex-col gap-1">
                <p className="text-lg font-medium">Price Range</p>
                {/*  */}
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="0"
                  />
                  <Input
                    type="number"
                    placeholder="999"
                  />
                </div>
                {/*  */}
              </div>
              {/*  */}
              <div className="flex flex-col gap-1">
                <p className="text-lg font-medium">Event Type</p>
                {/*  */}
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="option-one"
                      id="option-one"
                    />
                    <Label htmlFor="option-one">Online</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="option-two"
                      id="option-two"
                    />
                    <Label htmlFor="option-two">Free Events</Label>
                  </div>
                </RadioGroup>
                {/*  */}
              </div>
              {/*  */}
              <div className="flex flex-col gap-1">
                <p className="text-lg font-medium">Location</p>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="City, Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Karachi, Pakistan</SelectItem>
                    <SelectItem value="dark">Lahore, Pakistan</SelectItem>
                    <SelectItem value="dark">Islamabad, Pakistan</SelectItem>
                  </SelectContent>
                </Select>
                {/*  */}
              </div>
              {/*  */}
            </div>
            {/*  */}
            <div className="flex items-center justify-between gap-2">
              {/*  */}
              <Button
                variant={"secondary"}
                className="text-purple-600"
              >
                Clear All
              </Button>
              {/*  */}
              <Button className="bg-purple-600">Apply Filters</Button>
            </div>

            {/*  */}
          </div>
          {/*  */}
        </div>
        {/*  */}
        {/*  */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex-1 xl:grid-cols-3">
          {mockEventsData.map((item, index) => {
            return (
              <Link
                href={`${Routes.events}/test`}
                key={index}
              >
                <EventCardTwoComponent item={item} />
              </Link>
            );
          })}
        </div>

        {/*  */}
        {/*  */}
      </div>
      {/*  */}
      {/*  */}
    </div>
  );
}
