"use client";
import { ModuleWithSubsTwo } from "@/actions/module";
import {
  findSeatingObjectWhereModuleId,
  SeatingObjectWithSubs,
  SeatingSubObjectWithSubs,
} from "@/actions/seating";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Armchair,
  Dock,
  DoorClosed,
  Lectern,
  Music,
  Theater,
  User,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import LoaderSpin from "../LoaderSpin";

export default function SeatingArrangementComponent(props: {
  module: ModuleWithSubsTwo;
}) {
  //
  const moduleD = props?.module;
  const [isLoading, setIsLoading] = useState(false);
  const [seatingObjects, setSeatingObjects] = useState<SeatingObjectWithSubs[]>(
    [],
  );
  //
  const findSeatingObjectsFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findSeatingObjectWhereModuleId(moduleD?.id ?? 0);
    setSeatingObjects(result);
    setIsLoading(false);
  }, [moduleD]);
  //
  useEffect(() => {
    findSeatingObjectsFN();
  }, [findSeatingObjectsFN]);
  //
  const ObjectComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    const { verticalAxis, horizontalAxis, width, height, scale } =
      seatingObject;
    //
    return (
      <Rnd
        bounds={"parent"}
        position={{
          y: verticalAxis ?? 0,
          x: horizontalAxis ?? 0,
        }}
        enableResizing={false}
        disableDragging={true}
      >
        <div className="group relative flex h-full flex-col">
          {seatingObject?.seatingType === "TABLE" ? (
            <SeatingTypeTableComponent seatingObject={seatingObject} />
          ) : seatingObject?.seatingType === "CHAIR" ? (
            <SeatingTypeChairComponent seatingObject={seatingObject} />
          ) : (
            <SeatingTypeObjectComponent seatingObject={seatingObject} />
          )}
        </div>
      </Rnd>
    );
  };
  //
  const SeatingTypeTableComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    const { subObjects } = seatingObject;
    const divRef = useRef<HTMLDivElement>(null);
    const [center, setCenter] = useState(0);
    const [radius, setRadius] = useState(0);
    const [total, setTotal] = useState(0);
    // ROUND
    // const center = divRef?.current?.clientWidth ?? 0 / 2; // half of container size / h-80 w-80
    useEffect(() => {
      if (divRef?.current) {
        setCenter(divRef?.current?.clientWidth / 2);
        setRadius(divRef?.current?.clientWidth / 1.3);
      }
      setTotal(subObjects?.length);
    }, [divRef, subObjects]);
    //
    return (
      <div
        className="flex flex-col"
        ref={divRef}
      >
        {/* RECTANGLE */}

        {seatingObject?.tableShape === "RECTANGLE" ? (
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col gap-2">
              {subObjects[0] && (
                <SubObjectComponent seatingSubObject={subObjects[0]} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-center gap-2">
                {[2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map(
                  (each) =>
                    subObjects[each] && (
                      <SubObjectComponent
                        key={each}
                        seatingSubObject={subObjects[each]}
                      />
                    ),
                )}
              </div>

              <ObjectTableInnerComponent seatingObject={seatingObject} />

              <div className="flex justify-center gap-2">
                {[3, 5, 7, 9, 11, 13, 15, 17, 19].map(
                  (each) =>
                    subObjects[each] && (
                      <SubObjectComponent
                        key={each}
                        seatingSubObject={subObjects[each]}
                      />
                    ),
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {subObjects[1] && (
                <SubObjectComponent seatingSubObject={subObjects[1]} />
              )}
            </div>
          </div>
        ) : null}

        {/* ROUND */}

        {seatingObject?.tableShape === "ROUND" ? (
          <div className="relative flex flex-col">
            {subObjects?.map((each, i) => {
              const angle = (2 * Math.PI * i) / total; // spread evenly
              const x = center + radius * Math.cos(angle) - 20; // -20 to center button
              const y = center + radius * Math.sin(angle) - 20;

              return (
                <div
                  key={each?.id}
                  className={`absolute`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                >
                  <SubObjectComponent seatingSubObject={each} />
                </div>
              );
            })}

            <ObjectTableInnerComponent seatingObject={seatingObject} />
          </div>
        ) : null}

        {/*  */}
      </div>
    );
  };
  //
  const ObjectTableInnerComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    const { tableShape } = seatingObject;

    return (
      <div
        className={cn("flex flex-col items-center gap-2 border p-2", {
          "h-40 w-40 rounded-full p-8": tableShape === "ROUND",
        })}
      >
        <div className="flex flex-col items-center text-center">
          <Dock />
          <p className="">{seatingObject?.name}</p>
          <p className="text-xs">
            Chairs {seatingObject?.subObjects?.length ?? 0}
          </p>
        </div>
      </div>
    );
  };
  //
  const SeatingTypeChairComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    const { chairLayout, columns } = seatingObject;

    return (
      <div className="flex flex-col">
        {/* SINGLE */}

        {chairLayout === "SINGLE" ? (
          <div className="flex flex-col items-center gap-2">
            <ObjectChairInnerComponent seatingObject={seatingObject} />
            <SubObjectComponent seatingSubObject={seatingObject} />
          </div>
        ) : null}

        {/* GRID */}

        {chairLayout === "GRID" ? (
          <div className="flex flex-col items-center gap-2">
            <ObjectChairInnerComponent seatingObject={seatingObject} />

            {/*  */}
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${columns ?? 0}, minmax(40px, 1fr))`,
              }}
            >
              {seatingObject?.subObjects?.map((each) => {
                return (
                  <SubObjectComponent
                    key={each?.id}
                    seatingSubObject={each}
                  />
                );
              })}
            </div>

            {/*  */}
          </div>
        ) : null}

        {/*  */}
      </div>
    );
  };
  //
  const ObjectChairInnerComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    const { chairLayout } = seatingObject;

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center text-center">
          <Armchair />
          <p className="">{seatingObject?.name}</p>

          {/*  */}

          {chairLayout === "GRID" ? (
            <p className="text-xs">
              Rows {seatingObject?.rows ?? 0} | Columns{" "}
              {seatingObject?.columns ?? 0}
            </p>
          ) : null}

          {/*  */}
        </div>
      </div>
    );
  };
  //
  const SubObjectComponent = ({
    seatingSubObject,
  }: {
    seatingSubObject: SeatingSubObjectWithSubs;
  }) => {
    const { guestList } = seatingSubObject;

    return (
      <>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              disabled={isLoading}
              className="flex h-10 w-10 items-center justify-center overflow-hidden border"
            >
              {guestList ? <User /> : <Armchair />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{guestList?.name}</p>
          </TooltipContent>
        </Tooltip>
      </>
    );
  };
  //
  const SeatingTypeObjectComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    return <ObjectInnerComponent seatingObject={seatingObject} />;
  };
  //
  const ObjectInnerComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    const { name, seatingType } = seatingObject;

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          {seatingType === "STAGE" ? (
            <Theater />
          ) : seatingType === "PODIUM" ? (
            <Lectern />
          ) : seatingType === "EXIT" ? (
            <DoorClosed />
          ) : seatingType === "DANCEFLOOR" ? (
            <Music />
          ) : null}

          <p className="">{name}</p>
        </div>
      </div>
    );
  };
  //
  return (
    <div className="relative flex flex-1 flex-col">
      {isLoading ? <LoaderSpin /> : null}

      {/*  */}
      {seatingObjects?.map((each) => (
        <ObjectComponent
          key={each.id}
          seatingObject={each}
        />
      ))}
    </div>
  );
}
