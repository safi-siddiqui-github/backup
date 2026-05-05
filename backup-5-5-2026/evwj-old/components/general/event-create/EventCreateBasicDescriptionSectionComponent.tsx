"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
import { ImageIcon, NotebookText, Text, VideoIcon } from "lucide-react";

export default function EventCreateBasicDescriptionSectionComponent() {
	//
	return (
		<Card>
			{/*  */}

			{/*  */}
			<CardContent>
				{/*  */}

				{/*  */}
				<Accordion type="single" collapsible>
					{/*  */}

					{/*  */}
					<AccordionItem value="item-1">
						{/*  */}

						{/*  */}
						<AccordionTrigger className="cursor-pointer">
							{/*  */}
							<CardTitle className="flex items-center gap-2 text-lg">
								{/*  */}
								<NotebookText />
								{/*  */}
								<span>Event Description</span>
								{/*  */}
							</CardTitle>
							{/*  */}
						</AccordionTrigger>
						{/*  */}

						{/*  */}
						<AccordionContent className="flex flex-col gap-4">
							{/*  */}

							{/*  */}
							<ButtonGroup className="flex flex-wrap">
								{/*  */}
								<Button variant={"outline"}>
									<Text /> Text
								</Button>
								{/*  */}
								<Button variant={"outline"}>
									<ImageIcon /> Image
								</Button>
								{/*  */}
								<Button variant={"outline"}>
									<VideoIcon /> Video
								</Button>
								{/*  */}
							</ButtonGroup>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-6">
								{/*  */}

								{/*  */}
								<Card>
									{/*  */}

									{/*  */}
									<CardHeader>
										{/*  */}

										{/*  */}
										<CardTitle className="flex items-center gap-2">
											<Text /> <span>Text Block</span>
										</CardTitle>
										{/*  */}

										{/*  */}
									</CardHeader>
									{/*  */}

									{/*  */}
									<CardContent>
										{/*  */}

										{/*  */}
										<Textarea
											className="h-32"
											placeholder="Enter your text here"
										></Textarea>
										{/*  */}

										{/*  */}
									</CardContent>
									{/*  */}

									{/*  */}
								</Card>
								{/*  */}

								{/*  */}
								<Card>
									{/*  */}

									{/*  */}
									<CardHeader>
										{/*  */}

										{/*  */}
										<CardTitle className="flex items-center gap-2">
											<ImageIcon /> <span>Image Block</span>
										</CardTitle>
										{/*  */}

										{/*  */}
									</CardHeader>
									{/*  */}

									{/*  */}
									<CardContent>
										{/*  */}

										{/*  */}
										<Label className="flex h-32 cursor-pointer items-center justify-center rounded border-2 border-dashed">
											{/*  */}

											{/*  */}
											<div className="flex flex-col items-center gap-2 font-normal">
												{/*  */}

												{/*  */}
												<VideoIcon className="size-7" />
												{/*  */}

												{/*  */}
												<CardTitle>JPEG, PNG up to 10MB</CardTitle>
												{/*  */}

												{/*  */}
												<CardDescription>
													Drop your image here or click to browse
												</CardDescription>
												{/*  */}

												{/*  */}
											</div>
											{/*  */}

											{/*  */}
											<Input type="file" className="hidden" />
											{/*  */}

											{/*  */}
										</Label>
										{/*  */}

										{/*  */}
									</CardContent>
									{/*  */}

									{/*  */}
								</Card>
								{/*  */}

								{/*  */}
								<Card>
									{/*  */}

									{/*  */}
									<CardHeader>
										{/*  */}

										{/*  */}
										<CardTitle className="flex items-center gap-2">
											<VideoIcon /> <span>Video Block</span>
										</CardTitle>
										{/*  */}

										{/*  */}
									</CardHeader>
									{/*  */}

									{/*  */}
									<CardContent>
										{/*  */}

										{/*  */}
										<Label className="flex h-32 cursor-pointer items-center justify-center rounded border-2 border-dashed">
											{/*  */}

											{/*  */}
											<div className="flex flex-col items-center gap-2 font-normal">
												{/*  */}

												{/*  */}
												<VideoIcon className="size-7" />
												{/*  */}

												{/*  */}
												<CardTitle>MP4, MOV up to 50MB</CardTitle>
												{/*  */}

												{/*  */}
												<CardDescription>
													Drop your video here or click to browse
												</CardDescription>
												{/*  */}

												{/*  */}
											</div>
											{/*  */}

											{/*  */}
											<Input type="file" className="hidden" />
											{/*  */}

											{/*  */}
										</Label>
										{/*  */}

										{/*  */}
									</CardContent>
									{/*  */}

									{/*  */}
								</Card>
								{/*  */}

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
}
