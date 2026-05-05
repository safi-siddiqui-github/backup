"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { ActionResponseHelper } from "@/lib/response-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const profileSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  username: z.string().optional(),
});

export default function ProfileTab() {
  const [isUploading, setIsUploading] = useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      // firstname: userStore?.user?.firstname || "",
      // lastname: userStore?.user?.lastname || "",
      // email: userStore?.user?.email || "",
      // phone: userStore?.user?.phone || "",
      // username: userStore?.user?.username || "",
    },
  });

  const onProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
    // const response = await ActionResponseHelper(async () => {
    //   return {
    //     success: true,
    //   };
    // });
    // if (response.success) {
    //   // userStore.setUser(response.data?.user);
    //   toast.success(response.message || "Profile updated successfully");
    // } else {
    //   toast.error(response.message || "Failed to update profile");
    // }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          // In a real app, you would upload to S3 and update the user's profilePhoto
          setIsUploading(false);
          toast.success("Profile photo updated successfully");
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const userInitials = "SF";
  // const userInitials =
  // 	userStore?.user?.firstname?.[0]?.toUpperCase() ||
  // 	userStore?.user?.lastname?.[0]?.toUpperCase() ||
  // 	userStore?.user?.email?.[0]?.toUpperCase() ||
  // 	"U";

  return (
    <Card className="bg-white/80 backdrop-blur-sm dark:bg-[#020617]">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and professional details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Photo Section */}
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
            //   src={
            //     userStore?.user?.email
            //       ? `https://api.dicebear.com/7.x/initials/svg?seed=${userStore.user.email}`
            //       : undefined
            //   }
            />
            <AvatarFallback className="bg-linear-to-br from-purple-500 to-blue-500 text-2xl text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Label htmlFor="photo-upload">Profile Photo</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isUploading}
                onClick={() => document.getElementById("photo-upload")?.click()}
              >
                <Camera className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Change Photo"}
              </Button>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
          </div>
        </div>

        <Separator />

        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={profileForm.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Your unique username (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
