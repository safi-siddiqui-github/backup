import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";

export default function ContactFormSectionComponent() {
	return (
		<div className="flex flex-col gap-6 py-10 lg:grid lg:grid-cols-2">
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-4 p-4">
				{/*  */}

				{/*  */}
				<p className="text-2xl font-semibold md:text-4xl">Contact US</p>
				{/*  */}

				{/*  */}
				<p className="max-w-82">
					<span>Email, call or complete the form to learn how </span>
					<span className="text-primary font-medium">EventVerse </span>
					<span>can solve your messaging problem.</span>
				</p>
				{/*  */}

				{/*  */}
				<div className="flex flex-col gap-5 py-4">
					{/*  */}

					{/*  */}
					<div className="flex flex-wrap items-center gap-2">
						<Button size={"icon"} className="rounded-4xl">
							<Mail />
						</Button>
						<p className="text-primary text-xl font-medium">
							connect@eventverse.com
						</p>
					</div>
					{/*  */}

					{/*  */}
					<div className="flex flex-wrap items-center gap-2">
						<Button size={"icon"} className="rounded-4xl">
							<Phone />
						</Button>
						<p className="text-primary text-xl font-medium">
							+995 574 04 33 08
						</p>
					</div>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardHeader>
					<CardTitle className="text-2xl">Get in Touch</CardTitle>
					<CardDescription>You can reach us anytime</CardDescription>
				</CardHeader>
				{/*  */}

				{/*  */}
				<CardContent>
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-4">
						{/*  */}

						{/*  */}
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								<Label>First Name</Label>
								<Input placeholder="John" />
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								<Label>Last Name</Label>
								<Input placeholder="Doe" />
							</div>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<div className="flex flex-col gap-2">
							<Label>Email Address</Label>
							<Input placeholder="johndoe@gmail.com" />
						</div>
						{/*  */}

						{/*  */}
						<div className="flex flex-col gap-2">
							<Label>How can we help ?</Label>
							<Textarea placeholder="My message..." className="h-44" />
						</div>
						{/*  */}

						{/*  */}
						<Button className="w-full">Submit</Button>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent>
					<CardDescription className="text-center tracking-tight">
						<span>By contacting us, you agree to our </span>
						<span className="font-semibold"> Terms of Service </span>
						<span>and </span>
						<span className="font-semibold">Privacy Policy</span>
					</CardDescription>
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
		</div>
	);
}
