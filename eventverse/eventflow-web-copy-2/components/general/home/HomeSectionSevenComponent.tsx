import { Pencil } from "lucide-react";

export default function HomeSectionSevenComponent() {
  return (
    <div className="flex flex-col gap-6 px-4 py-10">
      <p className="text-center text-4xl font-semibold text-purple-600">
        How it Works
      </p>
      {/*  */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="flex flex-col items-center gap-5">
          {/*  */}
          <p className="text-xl font-medium">For Organizers</p>
          <div className="flex gap-2">
            <div>
              <Pencil />
            </div>
            <div className="flex flex-col">
              <p>Plan Your Events</p>
              <p>Chose name, date and costumize design.</p>
            </div>
          </div>
          {/*  */}
          <div className="flex gap-2">
            <div>
              <Pencil />
            </div>
            <div className="flex flex-col">
              <p>Plan Your Events</p>
              <p>Chose name, date and costumize design.</p>
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex gap-2">
            <div>
              <Pencil />
            </div>
            <div className="flex flex-col">
              <p>Plan Your Events</p>
              <p>Chose name, date and costumize design.</p>
            </div>
          </div>
          {/*  */}
          {/*  */}
        </div>
        {/*  */}
        <div className="flex flex-col items-center gap-5">
          {/*  */}
          <p className="text-xl font-medium">For Attendees</p>
          <div className="flex gap-2">
            <div>
              <Pencil />
            </div>
            <div className="flex flex-col">
              <p>Plan Your Events</p>
              <p>Chose name, date and costumize design.</p>
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className="flex gap-2">
            <div>
              <Pencil />
            </div>
            <div className="flex flex-col">
              <p>Plan Your Events</p>
              <p>Chose name, date and costumize design.</p>
            </div>
          </div>
          {/*  */}
          <div className="flex gap-2">
            <div>
              <Pencil />
            </div>
            <div className="flex flex-col">
              <p>Plan Your Events</p>
              <p>Chose name, date and costumize design.</p>
            </div>
          </div>
          {/*  */}
        </div>
        {/*  */}
        <div className="flex flex-col items-center gap-5">
          {/*  */}
          <p className="text-xl font-medium">For Vendors</p>
          <div className="flex gap-2">
            <div>
              <Pencil />
            </div>
            <div className="flex flex-col">
              <p>Plan Your Events</p>
              <p>Chose name, date and costumize design.</p>
            </div>
          </div>
          {/*  */}
          <div className="flex gap-2">
            <div>
              <Pencil />
            </div>
            <div className="flex flex-col">
              <p>Plan Your Events</p>
              <p>Chose name, date and costumize design.</p>
            </div>
          </div>
          {/*  */}
          <div className="flex gap-2">
            <div>
              <Pencil />
            </div>
            <div className="flex flex-col">
              <p>Plan Your Events</p>
              <p>Chose name, date and costumize design.</p>
            </div>
          </div>
          {/*  */}
        </div>
        {/*  */}
      </div>
    </div>
  );
}
