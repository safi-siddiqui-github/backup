"use client";

import AvatarGroupComponent from "@/components/ui-extends/AvatarGroupComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Images } from "@/lib/lib-images";
import {
  AtSign,
  Calendar,
  CircleCheckBig,
  Clock,
  Edit,
  Eye,
  Filter,
  MapPin,
  Search,
  Trash,
  Users,
} from "lucide-react";

export default function ScheduleConferenceCalendarComponent() {
  return (
    <div className="flex flex-col gap-6">
      {/*  */}

      {/*  */}
      <Card>
        {/*  */}

        {/*  */}
        <CardContent className="flex items-center gap-2">
          {/*  */}
          <Calendar />
          {/*  */}
          <CardTitle>Calendar</CardTitle>
          {/*  */}
        </CardContent>
        {/*  */}

        {/*  */}
        <Separator />
        {/*  */}

        {/*  */}
        <CardContent className="flex flex-col">
          {/*  */}

          {/*  */}
          <Accordion
            type="single"
            collapsible
          >
            {/*  */}

            {/*  */}
            <AccordionItem value="item-1">
              {/*  */}

              {/*  */}
              <AccordionTrigger className="cursor-pointer">
                {/*  */}
                <div className="flex items-center gap-2">
                  {/*  */}
                  <Filter />
                  {/*  */}
                  <CardTitle>Filter Calendar</CardTitle>
                  {/*  */}
                </div>
                {/*  */}
              </AccordionTrigger>
              {/*  */}

              {/*  */}
              <AccordionContent className="flex flex-col gap-4 p-1">
                {/*  */}

                {/*  */}
                <InputGroup>
                  {/*  */}
                  <InputGroupInput placeholder="Search Sessions, Speakers, Locations" />
                  {/*  */}
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  {/*  */}
                </InputGroup>
                {/*  */}

                {/*  */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/*  */}

                  {/*  */}
                  <Select>
                    {/*  */}

                    {/*  */}
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    {/*  */}

                    {/*  */}
                    <SelectContent>
                      {/*  */}
                      <SelectItem value="1">All Types</SelectItem>
                      {/*  */}
                      <SelectItem value="2">Keynote</SelectItem>
                      {/*  */}
                    </SelectContent>
                    {/*  */}

                    {/*  */}
                  </Select>
                  {/*  */}

                  {/*  */}
                  <Select>
                    {/*  */}

                    {/*  */}
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a track" />
                    </SelectTrigger>
                    {/*  */}

                    {/*  */}
                    <SelectContent>
                      {/*  */}
                      <SelectItem value="1">All Tracks</SelectItem>
                      {/*  */}
                      <SelectItem value="2">AI & ML</SelectItem>
                      {/*  */}
                    </SelectContent>
                    {/*  */}

                    {/*  */}
                  </Select>
                  {/*  */}

                  {/*  */}
                  <Select>
                    {/*  */}

                    {/*  */}
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    {/*  */}

                    {/*  */}
                    <SelectContent>
                      {/*  */}
                      <SelectItem value="1">All Location</SelectItem>
                      {/*  */}
                      <SelectItem value="2">Main Hall</SelectItem>
                      {/*  */}
                    </SelectContent>
                    {/*  */}

                    {/*  */}
                  </Select>
                  {/*  */}

                  {/*  */}
                  <Select>
                    {/*  */}

                    {/*  */}
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a date" />
                    </SelectTrigger>
                    {/*  */}

                    {/*  */}
                    <SelectContent>
                      {/*  */}
                      <SelectItem value="1">All Dates</SelectItem>
                      {/*  */}
                      <SelectItem value="2">Oct 21, 2025</SelectItem>
                      {/*  */}
                    </SelectContent>
                    {/*  */}

                    {/*  */}
                  </Select>
                  {/*  */}

                  {/*  */}
                </div>
                {/*  */}

                {/*  */}
                <CardDescription>Showing 30 of 30 sessions</CardDescription>
                {/*  */}

                {/*  */}
              </AccordionContent>
              {/*  */}

              {/*  */}
            </AccordionItem>
            {/*  */}

            {/*  */}
          </Accordion>
          {/*  */}

          {/*  */}
        </CardContent>
        {/*  */}

        {/*  */}

        {/*  */}
      </Card>
      {/*  */}

      {/*  */}
      <Card className="hidden">
        {/*  */}

        {/*  */}
        <CardContent className="flex items-center justify-between gap-2">
          {/*  */}

          {/*  */}
          <div className="flex items-center gap-2">
            {/*  */}
            <Calendar />
            {/*  */}
            <CardTitle>All Results</CardTitle>
            {/*  */}
          </div>
          {/*  */}

          {/*  */}
          <Select>
            <SelectTrigger className="w-42">
              <SelectValue placeholder="Select a Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Oct 21, 2025</SelectItem>
              <SelectItem value="2">Oct 22, 2025</SelectItem>
              <SelectItem value="3">Oct 23, 2025</SelectItem>
            </SelectContent>
          </Select>
          {/*  */}

          {/*  */}
        </CardContent>
        {/*  */}

        {/*  */}
        <CardContent className="flex flex-col gap-4">
          {/*  */}

          {/*  */}
          {Array.from({ length: 6 })?.map((item, index) => {
            return (
              <Card
                key={index}
                className="border-l-primary bg-primary/5 border-l-4"
              >
                {/*  */}

                {/*  */}
                <CardContent className="flex flex-col gap-4">
                  {/*  */}

                  {/*  */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/*  */}

                    {/*  */}
                    <CardTitle>Opening Keynote: The Future of AI</CardTitle>
                    {/*  */}

                    {/*  */}
                    <ButtonGroup>
                      {/*  */}
                      <Button size={"icon"}>
                        <Edit />
                      </Button>
                      {/*  */}
                      <Button
                        size={"icon"}
                        variant={"destructive"}
                      >
                        <Trash />
                      </Button>
                      {/*  */}
                    </ButtonGroup>
                    {/*  */}

                    {/*  */}
                  </div>
                  {/*  */}

                  {/*  */}
                  <CardDescription>
                    Exploring the transformative potential of artificial
                    intelligence in the next decade
                  </CardDescription>
                  {/*  */}

                  {/*  */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/*  */}
                    <Badge variant={"outline"}>Keynote</Badge>
                    {/*  */}
                    <Badge>AI & ML</Badge>
                    {/*  */}
                    <Badge variant={"secondary"}>90% Full</Badge>
                    {/*  */}
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/*  */}

                    {/*  */}
                    <div className="flex items-center gap-2">
                      {/*  */}
                      <Calendar />
                      {/*  */}
                      <CardDescription>Oct 21, 2025</CardDescription>
                      {/*  */}
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="flex items-center gap-2">
                      {/*  */}
                      <Clock />
                      {/*  */}
                      <CardDescription>09:00 AM - 10:00 AM</CardDescription>
                      {/*  */}
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="flex items-center gap-2">
                      {/*  */}
                      <MapPin />
                      {/*  */}
                      <CardDescription>Main Hall</CardDescription>
                      {/*  */}
                    </div>
                    {/*  */}

                    {/*  */}
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/*  */}

                    {/*  */}
                    <AvatarGroupComponent />
                    {/*  */}

                    {/*  */}
                    <div className="flex flex-col gap-2">
                      {/*  */}

                      {/*  */}
                      <div className="flex items-center gap-2">
                        {/*  */}
                        <CardTitle>100 / 500</CardTitle>
                        {/*  */}
                        <CardDescription>Registered</CardDescription>
                        {/*  */}
                      </div>
                      {/*  */}

                      {/*  */}
                      <div className="flex items-center gap-2">
                        {/*  */}
                        <CircleCheckBig />
                        {/*  */}
                        <CardDescription>16 Checked In</CardDescription>
                        {/*  */}
                      </div>
                      {/*  */}

                      {/*  */}
                    </div>
                    {/*  */}

                    {/*  */}
                  </div>
                  {/*  */}

                  {/*  */}
                  <Accordion
                    type="single"
                    collapsible
                  >
                    {/*  */}

                    {/*  */}
                    <AccordionItem value="item-1">
                      {/*  */}

                      {/*  */}
                      <AccordionTrigger className="cursor-pointer">
                        {/*  */}
                        <div className="flex items-center gap-2">
                          {/*  */}
                          <Eye />
                          {/*  */}
                          <CardTitle>View More</CardTitle>
                          {/*  */}
                        </div>
                        {/*  */}
                      </AccordionTrigger>
                      {/*  */}

                      {/*  */}
                      <AccordionContent className="flex flex-col gap-4 p-1">
                        {/*  */}

                        {/*  */}
                        <InputGroup className="bg-background">
                          {/*  */}
                          <InputGroupInput placeholder="Search Sessions, Speakers, Locations" />
                          {/*  */}
                          <InputGroupAddon>
                            <Search />
                          </InputGroupAddon>
                          {/*  */}
                        </InputGroup>
                        {/*  */}

                        {/*  */}
                        <div className="flex h-96 flex-col gap-2 overflow-auto pr-1">
                          {/*  */}
                          {Array.from({ length: 10 })?.map(
                            (subItem, subIndex) => {
                              return (
                                <Card key={subIndex}>
                                  {/*  */}

                                  {/*  */}
                                  <CardContent className="flex items-center justify-between">
                                    {/*  */}

                                    {/*  */}
                                    <div className="flex items-center gap-2">
                                      {/*  */}

                                      {/*  */}
                                      <Avatar className="size-10">
                                        <AvatarImage src={Images.landingPage} />
                                        <AvatarFallback>CN</AvatarFallback>
                                      </Avatar>
                                      {/*  */}

                                      {/*  */}
                                      <div className="flex flex-col">
                                        {/*  */}
                                        <CardTitle>John Doe</CardTitle>
                                        {/*  */}

                                        <div className="flex items-center gap-1">
                                          <CardDescription>
                                            Security Engineer
                                          </CardDescription>
                                          <AtSign className="size-4" />
                                          <CardDescription>
                                            Agile Ventures
                                          </CardDescription>
                                        </div>

                                        {/*  */}
                                      </div>
                                      {/*  */}

                                      {/*  */}
                                    </div>
                                    {/*  */}

                                    {/*  */}
                                    <Badge>AI & ML</Badge>
                                    {/*  */}

                                    {/*  */}
                                  </CardContent>
                                  {/*  */}

                                  {/*  */}
                                </Card>
                              );
                            },
                          )}
                          {/*  */}
                        </div>
                        {/*  */}

                        {/*  */}
                      </AccordionContent>
                      {/*  */}

                      {/*  */}
                    </AccordionItem>
                    {/*  */}

                    {/*  */}
                  </Accordion>
                  {/*  */}

                  {/*  */}
                </CardContent>
                {/*  */}

                {/*  */}
              </Card>
            );
          })}
          {/*  */}

          {/*  */}
        </CardContent>
        {/*  */}

        {/*  */}
      </Card>
      {/*  */}

      {/*  */}
      {Array.from({ length: 2 })?.map((item, index) => {
        return (
          <Card key={index}>
            {/*  */}

            {/*  */}
            <CardContent className="flex flex-col gap-4">
              {/*  */}

              {/*  */}
              <CardTitle>Schedule for Wednesday, October 22, 2025</CardTitle>
              {/*  */}

              {/*  */}
              <div className="flex flex-col gap-4">
                {/*  */}

                {/*  */}
                {Array.from({ length: 2 })?.map((subItem, subIndex) => {
                  return (
                    <div
                      key={subIndex}
                      className="flex flex-col gap-4"
                    >
                      {/*  */}

                      {/*  */}
                      <div className="bg-primary/5 text-primary flex w-fit items-center gap-2 rounded p-2">
                        <Clock />
                        <CardTitle>09:00 AM</CardTitle>
                      </div>
                      {/*  */}

                      {/*  */}
                      <div className="flex gap-4 overflow-auto pb-2">
                        {/*  */}

                        {/*  */}
                        {Array.from({ length: 6 })?.map(
                          (subSubItem, subSubIndex) => {
                            return (
                              <Card
                                key={subSubIndex}
                                className="border-l-primary bg-primary/5 min-w-sm flex-1 border-l-4"
                              >
                                {/*  */}

                                {/*  */}
                                <CardContent className="flex flex-col gap-4">
                                  {/*  */}

                                  {/*  */}
                                  <div className="flex flex-wrap items-center justify-between gap-4">
                                    {/*  */}

                                    {/*  */}
                                    <CardTitle>
                                      Opening Keynote: The Future of AI
                                    </CardTitle>
                                    {/*  */}

                                    {/*  */}
                                    <ButtonGroup>
                                      {/*  */}
                                      <Button size={"icon"}>
                                        <Edit />
                                      </Button>
                                      {/*  */}
                                      <Button
                                        size={"icon"}
                                        variant={"destructive"}
                                      >
                                        <Trash />
                                      </Button>
                                      {/*  */}
                                    </ButtonGroup>
                                    {/*  */}

                                    {/*  */}
                                  </div>
                                  {/*  */}

                                  {/*  */}
                                  <CardDescription>
                                    Exploring the transformative potential of
                                    artificial intelligence in the next decade
                                  </CardDescription>
                                  {/*  */}

                                  {/*  */}
                                  <div className="flex flex-wrap items-center gap-4">
                                    {/*  */}
                                    <Badge variant={"outline"}>Keynote</Badge>
                                    {/*  */}
                                    <Badge>AI & ML</Badge>
                                    {/*  */}
                                  </div>
                                  {/*  */}

                                  {/*  */}
                                  <div className="flex flex-wrap items-center gap-4">
                                    {/*  */}

                                    {/*  */}
                                    <div className="flex items-center gap-2">
                                      {/*  */}
                                      <Clock />
                                      {/*  */}
                                      <CardDescription>
                                        09:00 AM - 10:00 AM
                                      </CardDescription>
                                      {/*  */}
                                    </div>
                                    {/*  */}

                                    {/*  */}
                                    <div className="flex items-center gap-2">
                                      {/*  */}
                                      <MapPin />
                                      {/*  */}
                                      <CardDescription>
                                        Main Hall
                                      </CardDescription>
                                      {/*  */}
                                    </div>
                                    {/*  */}

                                    {/*  */}
                                  </div>
                                  {/*  */}

                                  {/*  */}
                                  <div className="flex items-center gap-2">
                                    {/*  */}
                                    <Users />
                                    {/*  */}
                                    <CardDescription>450/600</CardDescription>
                                    {/*  */}
                                    <Badge variant={"secondary"}>
                                      90% Full
                                    </Badge>
                                    {/*  */}
                                  </div>
                                  {/*  */}

                                  {/*  */}
                                </CardContent>
                                {/*  */}

                                {/*  */}
                              </Card>
                            );
                          },
                        )}
                        {/*  */}

                        {/*  */}
                      </div>
                      {/*  */}

                      {/*  */}
                    </div>
                  );
                })}

                {/*  */}
              </div>
              {/*  */}

              {/*  */}
            </CardContent>
            {/*  */}

            {/*  */}
          </Card>
        );
      })}
      {/*  */}

      {/*  */}
    </div>
  );
}
