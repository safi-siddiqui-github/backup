"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ImageIcon, Upload } from "lucide-react";

export default function EventCreatePhotoSectionComponent() {
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent>
					{/*  */}

					{/*  */}
					<div className="flex flex-col items-center gap-2 py-10">
						{/*  */}

						{/*  */}
						<ImageIcon className="text-primary size-10" />
						{/*  */}

						{/*  */}
						<CardTitle className="text-xl">Event Photos</CardTitle>
						{/*  */}

						{/*  */}
						<CardDescription>
							Add photos to make your event more engaging and visual
						</CardDescription>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<Separator />
				{/*  */}

				{/*  */}
				<CardContent>
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-4">
						{/*  */}

						{/*  */}
						<div className="flex flex-wrap items-center justify-between gap-4">
							{/*  */}

							{/*  */}
							<CardTitle className="text-lg">Event Photos</CardTitle>

							{/*  */}
							<CardDescription>0/10 photos</CardDescription>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<label className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed py-10">
							{/*  */}

							{/*  */}
							<Upload className="text-primary" />
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-1 text-center font-normal">
								{/*  */}

								{/*  */}
								<CardTitle className="text-lg">
									Drop photos here or click to upload
								</CardTitle>
								{/*  */}

								{/*  */}
								<CardDescription>
									Support for JPG, PNG files up to 10MB • 10 more photo(s)
									allowed
								</CardDescription>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<Input
								type="file"
								className="file:bg-primary file:text-secondary h-full w-fit pl-1 file:h-full file:rounded-sm file:px-4 file:py-2"
							/>
							{/*  */}

							{/*  */}
						</label>
						{/*  */}

						{/*  */}
					</div>
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
				<CardContent>
					{/*  */}

					{/*  */}
					<div className="flex flex-col items-center gap-4 py-10">
						{/*  */}

						{/*  */}
						<ImageIcon className="size-10" />
						{/*  */}

						{/*  */}
						<CardTitle className="text-xl">No Photos Uploaded Yet</CardTitle>
						{/*  */}

						{/*  */}
						<CardDescription>
							Add photos to make your event more visually appealing and help
							guests know what to expect
						</CardDescription>
						{/*  */}

						{/*  */}
						<div className="flex flex-wrap items-center justify-between gap-4">
							{/*  */}

							{/*  */}
							<Badge variant={"outline"}>Use high-quality images</Badge>
							{/*  */}
							<Badge variant={"outline"}>Show venue or setup</Badge>
							{/*  */}
							<Badge variant={"outline"}>Include event highlights</Badge>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
					</div>
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
