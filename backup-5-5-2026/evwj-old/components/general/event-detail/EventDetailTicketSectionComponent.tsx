import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ClientPropType } from "@/type";
import { Minus, Plus } from "lucide-react";
import { useMemo } from "react";

export default function EventDetailTicketSectionComponent(
	prop: ClientPropType,
) {
	//
	if (prop) {
	}
	// const slug = props.slug;
	//
	const tickets = useMemo(() => [{}, {}, {}, {}], []);
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-2">
				<Label>Promo Code</Label>
				<Input placeholder="Promo Code" />
			</div>
			{/*  */}

			<div className="flex flex-col gap-4">
				{/*  */}

				{/*  */}
				{tickets?.map((item, index) => {
					return (
						<Card key={index}>
							{/*  */}

							{/*  */}
							<CardHeader>
								{/*  */}

								{/*  */}
								<CardTitle>Free Early BIRD TICKET</CardTitle>
								{/*  */}

								{/*  */}
								<CardDescription>
									Enter for your chance to WIN BIG!
								</CardDescription>
								{/*  */}

								{/*  */}
								<CardAction>
									<div className="flex items-center gap-2">
										{/*  */}

										{/*  */}
										<Button size={"icon"} className="bg-primary">
											<Plus />
										</Button>
										{/*  */}

										{/*  */}
										<p className="text-xl font-bold">56</p>
										{/*  */}

										{/*  */}
										<Button size={"icon"} className="bg-primary">
											<Minus />
										</Button>
										{/*  */}

										{/*  */}
									</div>
								</CardAction>
								{/*  */}

								{/*  */}
							</CardHeader>
							{/*  */}

							{/*  */}
							<Separator />
							{/*  */}

							{/*  */}
							<CardContent>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}

									{/*  */}
									<p className="">
										<span className="font-medium">$7.18</span>
										<span> incl $2.18 Fee</span>
									</p>
									{/*  */}

									{/*  */}
									<p>Sales end on Oct 5, 2025</p>
									{/*  */}

									{/*  */}
									<CardDescription className="line-clamp-3 tracking-tight">
										Lorem, ipsum dolor sit amet consectetur adipisicing elit.
										Ducimus aut tempora saepe doloremque nulla numquam!
										Eligendi, facilis fuga iure voluptas quasi cupiditate culpa
										labore a corrupti voluptatibus fugiat sint repellendus!
										Reiciendis quasi necessitatibus numquam aliquam quis,
										deleniti, quod ullam maiores repellendus iusto atque neque
										molestias harum! Modi debitis tenetur ad?
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
					);
				})}
				{/*  */}

				{/*  */}
			</div>

			{/*  */}
		</div>
	);
}
