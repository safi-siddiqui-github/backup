"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
	GuestGroupSchema,
	GuestGroupSchemaType,
} from "@/lib/validation/guest-group";
import { ClientPropType, CustomEventDetail } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type GuestGroup = {
	name: string;
	memberLimit: number;
	description: string;
};

export default function RsvpGuestGroupDialogComponent({
	slug,
}: ClientPropType) {
	//
	const [pageData, setPageData] = useState<{
		loading?: boolean;
		guestGroup?: Partial<GuestGroup> | null;
	}>({
		loading: false,
		guestGroup: {
			name: "Family",
			memberLimit: 0,
			description: "",
		},
	});
	//
	const form = useForm<GuestGroupSchemaType>({
		resolver: zodResolver(GuestGroupSchema),
		defaultValues: {
			...pageData?.guestGroup,
			name: String(pageData?.guestGroup?.name),
			memberLimit: String(pageData?.guestGroup?.memberLimit),
		},
	});
	//
	const triggerRef = useRef<HTMLButtonElement>(null);
	//
	const handleTrigger = () => {
		triggerRef?.current?.click();
	};
	//
	const handleEvent = useCallback(async (e: Event) => {
		//
		setPageData({ loading: true });
		//
		handleTrigger();
		//
		const customEvent = e as CustomEvent;
		const detail: CustomEventDetail = customEvent.detail;
		//
		if (detail) {
			//
			// const response = await FindFirstGuestGroupAction({
			//   guestGroup: {
			//     id: detail?.id,
			//   },
			// });
			//
			// if (response?.success) {
			//
			// setPageData({ guestGroup: response?.data?.guestGroup });
			//
			// form?.setValue("name", guestGroup?.name ?? "");
			// form?.setValue("description", guestGroup?.description ?? "");
			// form?.setValue("memberLimit", String(guestGroup?.memberLimit));
			//
			// }
			//
		}
		//
		setPageData({ loading: false });
		//
	}, []);
	//
	useEffect(() => {
		//
		window.addEventListener("RsvpGuestGroupDialogComponent", handleEvent);
		//
		return () =>
			window.removeEventListener("RsvpGuestGroupDialogComponent", handleEvent);
		//
	}, [handleEvent]);
	//
	const onSubmitFN = async (values: GuestGroupSchemaType) => {
		//
		setPageData({ loading: true });
		//
		// const responseOne = await FindFirstEventAction({
		//   eventModel: {
		//     slug: slug ?? undefined,
		//   },
		// });
		//
		// if (responseOne?.success) {
		//   //
		//   const responseTwo = await FormSubmitHelper(async () => {
		//     //
		//     return await GuestGroupUpsertAction({
		//       ...values,
		//       eventModelId: responseOne?.data?.eventModel?.id,
		//       memberLimit: Number(values.memberLimit),
		//     });
		//     //
		//   }, form);
		//   //
		//   if (responseTwo?.success) {
		//     //
		//     toast(responseTwo?.message);
		//     //
		//     // router.push(Routes.web.guest.login);
		//     //
		//   }
		//   //
		// }
		//
		handleTrigger();
		//
		setPageData({ loading: false });
		//
	};
	//
	return (
		<div className="flex flex-col">
			{/*  */}

			{/*  */}
			<Dialog>
				{/*  */}

				{/*  */}
				<DialogTrigger ref={triggerRef} className="hidden"></DialogTrigger>
				{/*  */}

				{/*  */}
				<DialogContent className="flex flex-col lg:max-w-3xl">
					{/*  */}

					{/*  */}
					<DialogHeader>
						{/*  */}
						<DialogTitle>Manage Guest Groups</DialogTitle>
						{/*  */}
						<DialogDescription>
							Create and update your guest groups
						</DialogDescription>
						{/*  */}
					</DialogHeader>
					{/*  */}

					{/*  */}
					<form onSubmit={form.handleSubmit(onSubmitFN)}>
						{/*  */}

						{/*  */}
						<FieldGroup>
							{/*  */}

							{/*  */}
							<FieldSet>
								{/*  */}

								{/*  */}
								<FieldGroup className="lg:grid lg:grid-cols-2">
									{/*  */}

									{/*  */}
									<Controller
										name="name"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												{/*  */}
												<FieldLabel htmlFor={field.name}>
													Group Name *
												</FieldLabel>
												{/*  */}
												<Input
													{...field}
													id={field.name}
													placeholder="eg: Group Name"
												/>
												{/*  */}
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
												{/*  */}
											</Field>
										)}
									/>
									{/*  */}

									{/*  */}
									<Controller
										name="memberLimit"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												{/*  */}
												<FieldLabel htmlFor={field.name}>
													Member Limit
												</FieldLabel>
												{/*  */}
												<Input
													{...field}
													id={field.name}
													placeholder="No Limit"
													value={String(field.value)}
												/>
												{/*  */}
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
												{/*  */}
											</Field>
										)}
									/>
									{/*  */}

									{/*  */}
									<Controller
										name="description"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field
												data-invalid={fieldState.invalid}
												className="lg:col-span-full"
											>
												{/*  */}
												<FieldLabel htmlFor={field.name}>
													Description
												</FieldLabel>
												{/*  */}
												<Textarea
													{...field}
													id={field.name}
													placeholder="Brief description of this group."
													value={String(field.value)}
												/>
												{/*  */}
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
												{/*  */}
											</Field>
										)}
									/>
									{/*  */}

									{/*  */}
								</FieldGroup>
								{/*  */}

								{/*  */}
							</FieldSet>
							{/*  */}

							{/*  */}
							<Field orientation={"horizontal"} className="justify-end">
								{/*  */}
								<DialogClose asChild>
									<Button
										variant="outline"
										type="button"
										onClick={() => form.reset()}
									>
										Cancel
									</Button>
								</DialogClose>

								{/*  */}
								<Button type="submit" disabled={pageData.loading}>
									{pageData.loading && <Spinner />}
									Save Changes
								</Button>
								{/*  */}

								{/*  */}
							</Field>
							{/*  */}

							{/*  */}
						</FieldGroup>
						{/*  */}

						{/*  */}
					</form>
					{/*  */}

					{/*  */}
				</DialogContent>
				{/*  */}

				{/*  */}
			</Dialog>
			{/*  */}

			{/*  */}
		</div>
	);
}
