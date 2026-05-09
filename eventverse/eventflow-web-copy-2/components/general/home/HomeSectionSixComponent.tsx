import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function HomeSectionSixComponent() {
  return (
    <div className="flex flex-col gap-6 py-10 ">
      <p className="text-xl font-semibold text-center">Ready to Create Something Amazing?</p>
      {/*  */}
      <p className="text-center xl:text-xl">
        Join thousands of event planners who trust EventFlow to bring their
        visions to life.
      </p>
      {/*  */}
        <div className="flex justify-center item-center gap-5 flex-wrap ">
          <Button className="bg-purple-600 hover:bg-purple-700"> <Plus /> Create Your Next Event</Button>
          <Button className="text-purple-600 bg-transparent hover:bg-purple-300">Join Event</Button>
        </div>
        {/*  */}
        <p className="text-center xl:text-xl">
          No credit card required • Free forever plan available • Cancel anytime
        </p>
    </div>
  );
}
