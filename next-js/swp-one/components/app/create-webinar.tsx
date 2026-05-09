"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useWebinarStore, WebinarStoreType } from "@/lib/zustand";
import { useState } from "react";

export default function CreateWebinar() {
  const {
    isComplete,
    isModalOpen,
    setModalOpen,
    isSubmitting,
    setComplete,
    setSubmitting,
  } = useWebinarStore();

  const [wl, setWl] = useState("");

  function handleComplete(wId: string) {
    setComplete(true);
    setWl(`${process.env.NEXT_PUBLIC_BASE_URL}/live-webinar/${wId}`);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} onClick={() => setModalOpen(true)}>
          <Plus />
          Create a webinar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {isComplete ? (
            <DialogTitle>Create Webinar</DialogTitle>
          ) : (
            <DialogTitle>Webinar Created</DialogTitle>
          )}

          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
