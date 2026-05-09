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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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
  Plus,
  Search,
  Tag,
  Trash,
} from "lucide-react";

export default function ScheduleConferenceSessionComponent() {
  return (
    <div className="flex flex-col gap-6">
      {/*  */}

      {/*  */}
      <Card>
        {/*  */}

        {/*  */}
        <CardContent className="flex items-center justify-between gap-2">
          {/*  */}

          {/*  */}
          <div className="flex items-center gap-2">
            {/*  */}
            <Tag />
            {/*  */}
            <CardTitle>Sessions</CardTitle>
            {/*  */}
          </div>
          {/*  */}

          {/*  */}
          <Dialog>
            {/*  */}

            {/*  */}
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus />
                Add Session
              </Button>
            </DialogTrigger>
            {/*  */}

            {/*  */}
            <DialogContent className="max-h-full overflow-auto md:max-w-3xl">
              {/*  */}

              {/*  */}
              <DialogHeader>
                <DialogTitle>Add Track</DialogTitle>
                <DialogDescription>
                  Add your conference tracks
                </DialogDescription>
              </DialogHeader>
              {/*  */}

              {/*  */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/*  */}

                {/*  */}
                <div className="flex flex-col gap-1">
                  {/*  */}
                  <Label>Name</Label>
                  {/*  */}
                  <Input placeholder="Enter Session name" />
                  {/*  */}
                </div>
                {/*  */}

                {/*  */}
                <div className="flex flex-col gap-1">
                  {/*  */}
                  <Label>Description</Label>
                  {/*  */}
                  <Textarea placeholder="Breif description of the session"></Textarea>
                  {/*  */}
                </div>
                {/*  */}

                {/*  */}
                <div className="flex flex-col gap-1">
                  {/*  */}

                  {/*  */}
                  <Label>Session Type</Label>
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
                      <SelectItem value="1">Keynote</SelectItem>
                      {/*  */}
                      <SelectItem value="2">Session</SelectItem>
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
                <div className="flex flex-col gap-1">
                  {/*  */}

                  {/*  */}
                  <Label>Track</Label>
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
                      <SelectItem value="1">AI & ML</SelectItem>
                      {/*  */}
                      <SelectItem value="2">Cloud & DevOps</SelectItem>
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
                <div className="flex flex-col gap-1">
                  {/*  */}

                  {/*  */}
                  <Label>Date</Label>
                  {/*  */}

                  {/*  */}
                  <Select>
                    {/*  */}

                    {/*  */}
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    {/*  */}

                    {/*  */}
                    <SelectContent>
                      {/*  */}
                      <SelectItem value="1">Day 1 - Oct 21, 2025</SelectItem>
                      {/*  */}
                      <SelectItem value="1">Day 2 - Oct 22, 2025</SelectItem>
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
                <div className="flex flex-col gap-1">
                  {/*  */}

                  {/*  */}
                  <Label>Location</Label>
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
                      <SelectItem value="1">Main Hall</SelectItem>
                      {/*  */}
                      <SelectItem value="1">Reception Hall</SelectItem>
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
                <div className="flex flex-col gap-1">
                  {/*  */}
                  <Label>Start Time</Label>
                  {/*  */}
                  <Input type="time" />
                  {/*  */}
                </div>
                {/*  */}

                {/*  */}
                <div className="flex flex-col gap-1">
                  {/*  */}
                  <Label>End Time</Label>
                  {/*  */}
                  <Input type="time" />
                  {/*  */}
                </div>
                {/*  */}

                {/*  */}
                <div className="flex flex-col gap-1">
                  {/*  */}
                  <Label>Capacity</Label>
                  {/*  */}
                  <Input placeholder="eg: 10,20,..." />
                  {/*  */}
                </div>
                {/*  */}

                {/*  */}
                <div className="flex flex-col gap-1">
                  {/*  */}

                  {/*  */}
                  <Label>Level</Label>
                  {/*  */}

                  {/*  */}
                  <Select>
                    {/*  */}

                    {/*  */}
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    {/*  */}

                    {/*  */}
                    <SelectContent>
                      {/*  */}
                      <SelectItem value="1">Beginner</SelectItem>
                      {/*  */}
                      <SelectItem value="2">Intermediete</SelectItem>
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
              </div>
              {/*  */}

              {/*  */}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
              {/*  */}

              {/*  */}
            </DialogContent>
            {/*  */}

            {/*  */}
          </Dialog>
          {/*  */}

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
                  <CardTitle>Filter Sessions</CardTitle>
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
      <Card>
        {/*  */}

        {/*  */}
        <CardContent className="flex items-center justify-between gap-2">
          {/*  */}

          {/*  */}
          <div className="flex items-center gap-2">
            {/*  */}
            <Tag />
            {/*  */}
            <CardTitle>All Sessions</CardTitle>
            {/*  */}
          </div>
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
    </div>
  );
}
