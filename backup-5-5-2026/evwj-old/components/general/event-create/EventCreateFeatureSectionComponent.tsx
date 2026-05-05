"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, CheckCircle2, Zap } from "lucide-react";

export default function EventCreateFeatureSectionComponent() {
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
					<div className="flex flex-col gap-4">
						{/*  */}

						{/*  */}
						<div className="flex flex-wrap items-center justify-between gap-4">
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<CardTitle className="text-xl">
									Choose Your Event Features
								</CardTitle>
								{/*  */}

								{/*  */}
								<CardDescription>
									Select modules to customize your event experience
								</CardDescription>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<CardTitle className="text-primary text-xl">$0/month</CardTitle>
								{/*  */}

								{/*  */}
								<CardDescription>2 modules selected</CardDescription>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<Card className="dark:bg-secondary dark:border-primary dark:text-primary border-green-500 bg-green-50/40 text-green-600">
							{/*  */}

							{/*  */}
							<CardContent>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<CardTitle className="flex items-center gap-2">
										{/*  */}
										<Zap />
										{/*  */}
										<span>100% Free Setup!</span>
										{/*  */}
									</CardTitle>
									{/*  */}

									{/*  */}
									<CardDescription className="text-inherit">
										Your selected modules are completely free. Upgrade anytime
										for advanced features.
									</CardDescription>
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
					<div className="flex flex-col gap-6">
						{/*  */}

						{/*  */}
						{Array.from("1234").map((item, index) => {
							return (
								<div className="flex flex-col gap-4" key={index}>
									{/*  */}

									{/*  */}
									<div className="flex flex-col">
										{/*  */}

										{/*  */}
										<CardTitle className="flex items-center gap-2 text-lg">
											{/*  */}
											<CheckCircle2 />
											{/*  */}
											<span>Essential Modules</span>
											{/*  */}
										</CardTitle>
										{/*  */}

										{/*  */}
										<CardDescription>
											Core functionality every event needs
										</CardDescription>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
										{/*  */}

										{/*  */}
										{Array.from("1234")?.map((subItem, subIndex) => {
											return (
												<div className="group flex flex-col" key={subIndex}>
													{/*  */}

													{/*  */}
													<label className="flex flex-col transition-all duration-500 group-hover:scale-105">
														{/*  */}

														{/*  */}
														<Card className="bg-secondary border-secondary-foreground">
															{/*  */}

															{/*  */}
															<CardContent>
																{/*  */}

																{/*  */}
																<div className="flex flex-col gap-4">
																	{/*  */}

																	{/*  */}
																	<div className="flex items-start justify-between gap-2">
																		{/*  */}

																		{/*  */}
																		<div className="flex items-start gap-2">
																			{/*  */}

																			{/*  */}
																			<Calendar className="size-10" />
																			{/*  */}

																			{/*  */}
																			<div className="flex flex-col">
																				{/*  */}

																				{/*  */}
																				<CardTitle>RSVP Management</CardTitle>
																				{/*  */}

																				{/*  */}
																				<CardDescription>
																					Guest responses and attendance
																					tracking
																				</CardDescription>
																				{/*  */}

																				{/*  */}
																			</div>
																			{/*  */}

																			{/*  */}
																		</div>
																		{/*  */}

																		{/*  */}
																		<Checkbox />
																		{/*  */}

																		{/*  */}
																	</div>
																	{/*  */}

																	{/*  */}
																	<div className="flex h-0 flex-col gap-2 overflow-hidden transition-all duration-500 group-hover:h-24">
																		{/*  */}

																		{/*  */}
																		<CardTitle>Features:</CardTitle>
																		{/*  */}

																		<div className="flex flex-col">
																			{/*  */}

																			{/*  */}
																			<CardDescription>
																				Response tracking
																			</CardDescription>
																			{/*  */}

																			{/*  */}
																			<CardDescription>
																				Dietary preferences
																			</CardDescription>
																			{/*  */}

																			{/*  */}
																			<CardDescription>
																				Plus-one management
																			</CardDescription>
																			{/*  */}

																			{/*  */}
																		</div>

																		{/*  */}

																		{/*  */}
																	</div>
																	{/*  */}

																	{/*  */}
																	<div className="flex items-center justify-between gap-2">
																		{/*  */}

																		{/*  */}
																		<CardTitle>Free</CardTitle>
																		{/*  */}

																		{/*  */}
																		<Button>Select</Button>
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
													</label>
													{/*  */}

													{/*  */}
												</div>
											);
										})}
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</div>
							);
						})}
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
