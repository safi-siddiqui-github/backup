"use client";
import { ModuleWithSubsTwo } from "@/actions/module";
import {
  findGuestGroupWhereEventId,
  findGuestListWhereEventId,
  GuestListWithSubs,
} from "@/actions/rsvp";
import {
  assignGuestListToSeatingObject,
  deleteSeatingObject,
  deleteSeatingObjectWhereModuleId,
  findChairLayouts,
  findSeatingObject,
  findSeatingObjectWhereModuleId,
  findSeatingTypes,
  findTableShapes,
  handleSeatingObjectSwap,
  handleSmartAssign,
  SeatingObjectWithSubs,
  SeatingSubObjectWithSubs,
  SmartAssignTypeProps,
  unassignGuestListFromSeatingObject,
  upsertSeatingObject,
  upsertSeatingObjectWhereQty,
  upsertSeatingObjectWhereRowColumn,
} from "@/actions/seating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  formatChairLayout,
  formatLowercase,
  formatSeatingType,
} from "@/lib/helpers";
import { cn } from "@/lib/utils";
import {
  seatingChairSchema,
  seatingObjectSchema,
  seatingObjectSwapSchema,
  seatingTableSchema,
} from "@/lib/validation/seating";
import {
  ChairLayout,
  GuestGroup,
  SeatingType,
  TableShape,
} from "@/prisma/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Armchair,
  ArrowBigLeft,
  ArrowLeftRight,
  Dock,
  DoorClosed,
  Download,
  Edit,
  Lectern,
  Music,
  Pen,
  Plus,
  Presentation,
  Printer,
  RotateCcw,
  Theater,
  Trash,
  User,
  Users,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Rnd } from "react-rnd";
import z from "zod";
import LoaderSpin from "../LoaderSpin";
import SeatingCanvasComponent from "./SeatingCanvasComponent";

type SeatingTableSchemaType = z.infer<typeof seatingTableSchema>;
type SeatingChairSchemaType = z.infer<typeof seatingChairSchema>;
type SeatingObjectSchemaType = z.infer<typeof seatingObjectSchema>;
type SeatingObjectSwapSchemaType = z.infer<typeof seatingObjectSwapSchema>;
enum SeatingGuestAssignLayoutEnum {
  UNASSIGNED = "UNASSIGNED",
  TABLE = "TABLE",
}

export default function SeatingCanvas(props: { module: ModuleWithSubsTwo }) {
  //
  const moduleD = props?.module;
  const [isLoading, setIsLoading] = useState(false);
  const [seatingObject, setSeatingObject] =
    useState<SeatingObjectWithSubs | null>(null);
  const [seatingObjects, setSeatingObjects] = useState<SeatingObjectWithSubs[]>(
    [],
  );
  const [unassignedSeatingObjects, setUnassignedSeatingObjects] = useState<
    SeatingObjectWithSubs[]
  >([]);
  const [seatingTypes, setSeatingTypes] = useState<SeatingType[]>([]);
  const [tableShapes, setTableShapes] = useState<TableShape[]>([]);
  const [chairLayouts, setChairLayouts] = useState<ChairLayout[]>([]);
  const [guestGroups, setGuestGroups] = useState<GuestGroup[]>([]);
  const [guestLists, setGuestLists] = useState<GuestListWithSubs[]>([]);
  const [unAssignedguestLists, setUnAssignedGuestLists] = useState<
    GuestListWithSubs[]
  >([]);
  const tableRef = useRef<HTMLButtonElement>(null);
  const chairRef = useRef<HTMLButtonElement>(null);
  const guestRef = useRef<HTMLButtonElement>(null);
  const objectRef = useRef<HTMLButtonElement>(null);
  const swapRef = useRef<HTMLButtonElement>(null);
  //
  const [guestAssignTabValue, setGuestAssignTabValue] = useState<string>(
    SeatingGuestAssignLayoutEnum.UNASSIGNED,
  );
  useEffect(() => {
    setGuestAssignTabValue(
      localStorage.getItem("dashboardSeatingArrangementGuestAssignTab") ??
        SeatingGuestAssignLayoutEnum.UNASSIGNED,
    );
  }, []);
  function handleGuestAssignTabsChange(value: string) {
    localStorage.setItem("dashboardSeatingArrangementGuestAssignTab", value);
    setGuestAssignTabValue(value);
  }
  //
  const findSeatingTypesFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findSeatingTypes();
    setSeatingTypes(result);
    setIsLoading(false);
  }, []);
  //
  const findTableShapessFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findTableShapes();
    setTableShapes(result);
    setIsLoading(false);
  }, []);
  //
  const findChairLayoutsFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findChairLayouts();
    setChairLayouts(result);
    setIsLoading(false);
  }, []);
  //
  const findSeatingObjectsFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findSeatingObjectWhereModuleId(moduleD?.id ?? 0);
    setSeatingObjects(result);
    setIsLoading(false);
  }, [moduleD]);
  //
  const findSeatingObjectFN = useCallback(async (id: number) => {
    setIsLoading(true);
    const result = await findSeatingObject(id);
    setSeatingObject(result);
    setIsLoading(false);
  }, []);
  //
  const findGuestGroupsFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findGuestGroupWhereEventId(moduleD?.event?.id ?? 0);
    setGuestGroups(result);
    setIsLoading(false);
  }, [moduleD]);
  //
  const findGuestListsFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findGuestListWhereEventId(moduleD?.event?.id ?? 0);
    setGuestLists(result);
    setIsLoading(false);
  }, [moduleD]);
  //
  useEffect(() => {
    findSeatingTypesFN();
    findSeatingObjectsFN();
    findChairLayoutsFN();
    findTableShapessFN();
    findGuestGroupsFN();
    findGuestListsFN();
  }, [
    findSeatingTypesFN,
    findSeatingObjectsFN,
    findChairLayoutsFN,
    findTableShapessFN,
    findGuestGroupsFN,
    findGuestListsFN,
  ]);
  //
  const findUnassignedGuestListFN = useCallback(async () => {
    // 1. Collect guestListIds from seatingObjects (parent + subObjects)
    const assignedIds = seatingObjects
      ?.flatMap((obj) => [
        obj.guestListId, // parent guestListId
        ...(obj.subObjects?.map((sub) => sub.guestListId) || []), // subObjects guestListIds
      ])
      .filter((id): id is number => !!id); // remove null/undefined

    // 2. Filter guestLists whose id is NOT in assignedIds
    const unassigned = guestLists?.filter(
      (guest) => !assignedIds.includes(guest.id),
    );

    setUnAssignedGuestLists(unassigned);
  }, [guestLists, seatingObjects]);
  //
  const findUnassignedSeatingObjectsFN = useCallback(async () => {
    const result = seatingObjects?.filter((obj) => {
      if (obj.seatingType === "TABLE") {
        // Only care about subObjects
        return obj.subObjects?.some((sub) => !sub?.guestListId);
      }

      if (obj.seatingType === "CHAIR") {
        if (obj.chairLayout === "SINGLE") {
          // Check its own guestListId
          return !obj?.guestListId;
        }
        if (obj.chairLayout === "GRID") {
          // Check children
          return obj.subObjects?.some((sub) => !sub?.guestListId);
        }
      }

      return false; // ignore other seatingTypes
    });

    setUnassignedSeatingObjects(result);
  }, [seatingObjects]);
  //
  useEffect(() => {
    findUnassignedGuestListFN();
    findUnassignedSeatingObjectsFN();
  }, [findUnassignedGuestListFN, findUnassignedSeatingObjectsFN]);
  //
  const seatingObjectTableForm = useForm<SeatingTableSchemaType>({
    resolver: zodResolver(seatingTableSchema),
    values: {
      name: seatingObject?.name ?? "",
      note: seatingObject?.note ?? "",
      seatingType: "TABLE",
      tableShape: seatingObject?.tableShape ?? "RECTANGLE",
      guestGroupId: String(seatingObject?.guestGroupId ?? ""),
      seatingChairsQty: String(seatingObject?.subObjects?.length ?? ""),
    },
  });
  //
  const handleObjectTableFormSubmit = async (
    values: SeatingTableSchemaType,
  ) => {
    setIsLoading(true);
    const result = await upsertSeatingObject({
      id: seatingObject?.id ?? 0,
      moduleId: moduleD?.id,
      ...values,
      guestGroupId: Number(values?.guestGroupId),
    });
    //
    await upsertSeatingObjectWhereQty(
      result?.id ?? seatingObject?.id,
      Number(values?.seatingChairsQty ?? seatingObject?.subObjects?.length),
      "CHAIR",
    );
    //
    await refreshObject();
    setIsLoading(false);
  };
  //
  const seatingObjectChairForm = useForm<SeatingChairSchemaType>({
    resolver: zodResolver(seatingChairSchema),
    values: {
      name: seatingObject?.name ?? "",
      note: seatingObject?.note ?? "",
      seatingType: "CHAIR",
      guestGroupId: String(seatingObject?.guestGroupId ?? ""),
      chairLayout: seatingObject?.chairLayout ?? "SINGLE",
      rows: String(seatingObject?.rows ?? "0"),
      columns: String(seatingObject?.columns ?? "0"),
    },
  });
  //
  const handleObjectChairFormSubmit = async (
    values: SeatingChairSchemaType,
  ) => {
    setIsLoading(true);
    const result = await upsertSeatingObject({
      id: seatingObject?.id ?? 0,
      moduleId: moduleD?.id,
      ...values,
      guestGroupId: Number(values?.guestGroupId),
      rows: Number(values?.rows),
      columns: Number(values?.columns),
    });
    //
    await upsertSeatingObjectWhereRowColumn({
      seatingObject: result,
      seatingType: "CHAIR",
    });
    //
    await refreshObject();
    setIsLoading(false);
  };
  //
  const chairLayoutWatch = seatingObjectChairForm?.watch("chairLayout");
  //
  const seatingObjectForm = useForm<SeatingObjectSchemaType>({
    resolver: zodResolver(seatingObjectSchema),
    values: {
      name: seatingObject?.name ?? "",
      seatingType: seatingObject?.seatingType ?? "STAGE",
      width: String(seatingObject?.width ?? "0"),
      height: String(seatingObject?.height ?? "0"),
    },
  });
  //
  const handleObjectFormSubmit = async (values: SeatingObjectSchemaType) => {
    setIsLoading(true);
    await upsertSeatingObject({
      id: seatingObject?.id ?? 0,
      moduleId: moduleD?.id,
      ...values,
      width: Number(values?.width),
      height: Number(values?.height),
    });
    //
    await refreshObject();
    setIsLoading(false);
  };
  //
  const seatingObjectSwapForm = useForm<SeatingObjectSwapSchemaType>({
    resolver: zodResolver(seatingObjectSwapSchema),
    values: {
      firstGuestListId: "",
      secondGuestListId: "",
    },
  });
  //
  const handleObjectSwapFormSubmit = async (
    values: SeatingObjectSwapSchemaType,
  ) => {
    setIsLoading(true);
    //
    await handleSeatingObjectSwap({
      seatingObjectId: seatingObject?.id ?? 0,
      firstGuestListId: Number(values?.firstGuestListId),
      secondGuestListId: Number(values?.secondGuestListId),
    });
    //
    await refreshObject();
    setIsLoading(false);
  };
  //
  const refreshObject = useCallback(async () => {
    setSeatingObject(null);
    findSeatingObjectsFN();
  }, [findSeatingObjectsFN]);
  //
  const deleteSeatingObjectFN = async (id: number) => {
    setIsLoading(true);
    await deleteSeatingObject(id);
    await refreshObject();
    setIsLoading(false);
  };
  //
  const updateTableTrigger = async (id: number) => {
    setIsLoading(true);
    tableRef?.current?.click();
    await findSeatingObjectFN(id);
    setIsLoading(false);
  };
  //
  const updateChairTrigger = async (id: number) => {
    setIsLoading(true);
    chairRef?.current?.click();
    await findSeatingObjectFN(id);
    setIsLoading(false);
  };
  //
  const updateObjectTrigger = async (id: number) => {
    setIsLoading(true);
    objectRef?.current?.click();
    await findSeatingObjectFN(id);
    setIsLoading(false);
  };
  //
  const swapObjectTrigger = async (id: number) => {
    setIsLoading(true);
    swapRef?.current?.click();
    await findSeatingObjectFN(id);
    setIsLoading(false);
  };
  //
  const handleDragResize = useCallback(
    async (seatingObjectDT: SeatingObjectWithSubs) => {
      setIsLoading(true);
      await upsertSeatingObject({
        id: seatingObjectDT?.id ?? 0,
        horizontalAxis: seatingObjectDT?.horizontalAxis,
        verticalAxis: seatingObjectDT?.verticalAxis,
        width: seatingObjectDT?.width,
        height: seatingObjectDT?.height,
      });
      await refreshObject();
      setIsLoading(false);
    },
    [refreshObject],
  );
  //
  const handleAssignGuestTrigger = useCallback(
    async (id?: number) => {
      setIsLoading(true);
      await findSeatingObjectFN(id ?? 0);
      guestRef?.current?.click();
      setIsLoading(false);
    },
    [findSeatingObjectFN],
  );
  //
  const refreshGuestDialog = useCallback(async () => {
    await findSeatingObjectFN(seatingObject?.id ?? 0);
    await refreshObject();
  }, [findSeatingObjectFN, refreshObject, seatingObject]);
  //
  const handleAssignGuest = useCallback(
    async (guestListId?: number, seatingObjectDirectId?: number) => {
      setIsLoading(true);
      await assignGuestListToSeatingObject({
        seatingObjectId: seatingObjectDirectId ?? seatingObject?.id ?? 0,
        guestListId: guestListId ?? 0,
      });
      await refreshGuestDialog();
      setIsLoading(false);
    },
    [refreshGuestDialog, seatingObject],
  );
  //
  const handleUnassignGuest = useCallback(
    async (seatingObjectDirectId?: number) => {
      setIsLoading(true);
      await unassignGuestListFromSeatingObject({
        seatingObjectId: seatingObjectDirectId ?? seatingObject?.id ?? 0,
      });
      await refreshGuestDialog();
      setIsLoading(false);
    },
    [refreshGuestDialog, seatingObject],
  );
  //
  const resetCanvas = useCallback(async () => {
    setIsLoading(true);
    await deleteSeatingObjectWhereModuleId(moduleD?.id ?? 0);
    await refreshObject();
    setIsLoading(false);
  }, [moduleD, refreshObject]);
  //
  const ObjectTableInnerComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    const { tableShape } = seatingObject;

    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 border p-2",
          {
            "h-40 w-40 rounded-full": tableShape === "ROUND",
          },
        )}
      >
        <div className="flex flex-col items-center text-center">
          <Dock />
          <p className="">{seatingObject?.name}</p>
          <p className="text-xs">
            Chairs {seatingObject?.subObjects?.length ?? 0}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <DeleteObjectComponent seatingObject={seatingObject} />
          <EditObjectTableComponent seatingObject={seatingObject} />
          <SwapSubObjectComponent seatingObject={seatingObject} />
        </div>
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

        <div className="flex items-center gap-1">
          <DeleteObjectComponent seatingObject={seatingObject} />
          <EditObjectChairComponent seatingObject={seatingObject} />
          {chairLayout === "GRID" ? (
            <SwapSubObjectComponent seatingObject={seatingObject} />
          ) : null}
        </div>
      </div>
    );
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

        <div className="flex items-center gap-1">
          <DeleteObjectComponent seatingObject={seatingObject} />
          <EditObjectComponent seatingObject={seatingObject} />
        </div>
      </div>
    );
  };
  //
  const ObjectComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    const { verticalAxis, horizontalAxis, width, height, scale } =
      seatingObject;
    //
    // const [baseWidth, setBaseWidth] = useState(width ?? 0);
    // const [baseHeight, setBaseHeight] = useState(height ?? 0);
    // const [baseScale, setBaseScale] = useState(scale ?? 1);
    //
    // useEffect(() => {
    //   setBaseScale(scale!);
    // }, [scale]);
    //
    return (
      <Rnd
        bounds={"parent"}
        position={{
          y: verticalAxis ?? 0,
          x: horizontalAxis ?? 0,
        }}
        onDragStop={(e, d) => {
          handleDragResize({
            ...seatingObject,
            verticalAxis: d.y,
            horizontalAxis: d.x,
          });
        }}
        // onResizeStart={(e, direction, ref) => {
        //   setOldWidth(ref?.clientWidth);
        //   setOldHeight(ref?.clientHeight);
        // }}
        // onResize={(e, direction, ref) => {
        //   const newWidth = ref.clientWidth;
        //   const newScale = newWidth / baseWidth;
        //   setBaseScale(newScale);
        // }}
        // onResizeStop={(e, direction, ref, _delta, _position) => {
        //   // const newWidth = ref.clientWidth;
        //   // const newHeight = ref.clientHeight;
        //   // const newScale = newWidth / baseWidth;

        //   // const scale = oldHeight + oldWidth;
        //   // const oldScale = oldHeight + oldWidth;
        //   // const newScale = ref?.clientWidth + ref?.clientWidth;

        //   console.log(baseScale);

        //   handleDragResize({
        //     ...seatingObject,
        //     // width: Number(ref?.clientWidth),
        //     // height: Number(ref?.clientHeight),
        //     // width: Number(oldWidth),
        //     // height: Number(oldHeight),
        //     // scale: baseScale,
        //   });
        // }}
        enableResizing={false}
      >
        <div className="group relative flex h-full flex-col">
          {seatingObject?.seatingType === "TABLE" ? (
            <SeatingTypeTableComponent seatingObject={seatingObject} />
          ) : seatingObject?.seatingType === "CHAIR" ? (
            <SeatingTypeChairComponent seatingObject={seatingObject} />
          ) : (
            <SeatingTypeObjectComponent seatingObject={seatingObject} />
          )}

          {/*  */}

          {/* <MoveDiagonal2 className="absolute right-0 bottom-0 hidden size-4 group-hover:block" /> */}
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
  const SeatingTypeObjectComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    return <ObjectInnerComponent seatingObject={seatingObject} />;
  };
  //
  const SubObjectComponent = ({
    seatingSubObject,
  }: {
    seatingSubObject: SeatingSubObjectWithSubs;
  }) => {
    const { id, guestList } = seatingSubObject;

    return (
      <>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              disabled={isLoading}
              className="flex h-10 w-10 items-center justify-center overflow-hidden border"
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={() => {
                handleAssignGuestTrigger(id ?? 0);
              }}
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
  const DeleteObjectComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    return (
      <Button
        size={"sm"}
        variant={"destructive"}
        disabled={isLoading}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => {
          deleteSeatingObjectFN(seatingObject?.id);
        }}
      >
        <Trash />
      </Button>
    );
  };
  //
  const EditObjectTableComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    return (
      <Button
        size={"sm"}
        variant={"outline"}
        disabled={isLoading}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => {
          updateTableTrigger(seatingObject?.id);
        }}
      >
        <Edit />
      </Button>
    );
  };
  //
  const EditObjectChairComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    return (
      <Button
        size={"sm"}
        variant={"outline"}
        disabled={isLoading}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => {
          updateChairTrigger(seatingObject?.id);
        }}
      >
        <Edit />
      </Button>
    );
  };
  //
  const EditObjectComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    return (
      <Button
        size={"sm"}
        variant={"outline"}
        disabled={isLoading}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => {
          updateObjectTrigger(seatingObject?.id);
        }}
      >
        <Edit />
      </Button>
    );
  };
  //
  const SwapSubObjectComponent = ({
    seatingObject,
  }: {
    seatingObject: SeatingObjectWithSubs;
  }) => {
    return (
      <Button
        size={"sm"}
        disabled={isLoading}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => {
          swapObjectTrigger(seatingObject?.id);
        }}
      >
        <ArrowLeftRight />
      </Button>
    );
  };
  //
  const DirectAssignSeatingObjectComponent = ({
    guestList,
  }: {
    guestList: GuestListWithSubs;
  }) => {
    //
    const handleChange = async (value: string) => {
      setIsLoading(true);
      await assignGuestListToSeatingObject({
        seatingObjectId: Number(value),
        guestListId: guestList?.id,
      });
      await refreshObject();
      setIsLoading(false);
    };
    //
    return (
      <Select onValueChange={handleChange}>
        <SelectTrigger className="">
          <SelectValue placeholder="Assign To" />
        </SelectTrigger>
        <SelectContent>
          {unassignedSeatingObjects?.map((each) => {
            return (
              <SelectItem
                key={each?.id}
                value={String(each?.id)}
              >
                {each?.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  };
  //
  const SmartAssignSeatingObjectComponent = () => {
    //

    const handleChange = async (value: string) => {
      setIsLoading(true);
      //
      let type: SmartAssignTypeProps = "ALL";
      if (value === "assign-groups") {
        type = "GROUP";
      }
      //
      await handleSmartAssign({
        moduleId: moduleD?.id ?? 0,
        eventId: moduleD?.eventId ?? 0,
        type: type,
      });
      await refreshObject();
      setIsLoading(false);
    };
    //
    return (
      <Select onValueChange={handleChange}>
        <SelectTrigger className="">
          <SelectValue placeholder="Smart Assign" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="assign-groups">
            <Zap />
            Assign Groups
          </SelectItem>
          <SelectItem value="assign-all">
            <Zap />
            Assign All
          </SelectItem>
        </SelectContent>
      </Select>
    );
  };
  //
  const SwapObjectDialogComponent = () => {
    //
    const guestLists = seatingObject?.subObjects
      ?.map((each) => each?.guestList)
      .filter((each) => !!each);
    //
    return (
      <>
        <div className="flex flex-col">
          <CardTitle className="flex items-center gap-1">
            <Users />
            Table Overview
          </CardTitle>
        </div>

        <div className="flex flex-col gap-4">
          <Form {...seatingObjectSwapForm}>
            <form
              onSubmit={seatingObjectSwapForm.handleSubmit(
                handleObjectSwapFormSubmit,
              )}
              className="flex flex-col gap-4"
            >
              <FormField
                control={seatingObjectSwapForm.control}
                name="firstGuestListId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Seat</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a seat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {guestLists?.map((each) => (
                          <SelectItem
                            key={`first-${each?.id}`}
                            value={String(each?.id)}
                          >
                            {each?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ArrowLeftRight className="self-center" />

              <FormField
                control={seatingObjectSwapForm.control}
                name="secondGuestListId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Second Seat</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a seat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {guestLists?.map((each) => (
                          <SelectItem
                            key={`second-${each?.id}`}
                            value={String(each?.id)}
                          >
                            {each?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <LoaderSpin /> : <Plus />}
                  Swap Seats
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </>
    );
  };
  //
  return (
    <div className="flex flex-col gap-10">
      {/*  */}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/*  */}

          <Dialog>
            <DialogTrigger
              ref={tableRef}
              asChild
            >
              <Button>
                <Plus />
                Add Table
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-full overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Seating Table</DialogTitle>
                <DialogDescription>Add table to your canvas</DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <Form {...seatingObjectTableForm}>
                  <form
                    onSubmit={seatingObjectTableForm.handleSubmit(
                      handleObjectTableFormSubmit,
                    )}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      control={seatingObjectTableForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col items-start">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="eg: Title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seatingObjectTableForm.control}
                      name="guestGroupId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guest Group</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              {guestGroups?.map((each) => (
                                <SelectItem
                                  key={each?.id}
                                  value={String(each?.id)}
                                >
                                  {each?.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seatingObjectTableForm.control}
                      name="tableShape"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Table Shape</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a shape" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tableShapes?.map((each) => (
                                <SelectItem
                                  key={each}
                                  value={each}
                                >
                                  {formatLowercase(each)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seatingObjectTableForm.control}
                      name="seatingChairsQty"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col items-start">
                          <FormLabel>Chairs Qty</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="eg: Seats..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seatingObjectTableForm.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col items-start">
                          <FormLabel>Note</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="eg: Note..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? <LoaderSpin /> : <Plus />}
                        Save Table
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger
              ref={chairRef}
              asChild
            >
              <Button variant={"outline"}>
                <Plus />
                Add Chair
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-full overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Seating Chairs</DialogTitle>
                <DialogDescription>Add Chairs to your canvas</DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <Form {...seatingObjectChairForm}>
                  <form
                    onSubmit={seatingObjectChairForm.handleSubmit(
                      handleObjectChairFormSubmit,
                    )}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      control={seatingObjectChairForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col items-start">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="eg: Title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seatingObjectChairForm.control}
                      name="guestGroupId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guest Group</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              {guestGroups?.map((each) => (
                                <SelectItem
                                  key={each?.id}
                                  value={String(each?.id)}
                                >
                                  {each?.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seatingObjectChairForm.control}
                      name="chairLayout"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Chair Layout</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col"
                            >
                              {chairLayouts?.map((each) => (
                                <FormItem
                                  className="flex items-center gap-3"
                                  key={each}
                                >
                                  <FormControl>
                                    <RadioGroupItem value={each} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {formatChairLayout(each)}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {chairLayoutWatch === "GRID" ? (
                      <div className="flex flex-col gap-4">
                        <FormField
                          control={seatingObjectChairForm.control}
                          name="rows"
                          render={({ field }) => (
                            <FormItem className="flex flex-1 flex-col items-start">
                              <FormLabel>Rows</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="eg: 1,2,3..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={seatingObjectChairForm.control}
                          name="columns"
                          render={({ field }) => (
                            <FormItem className="flex flex-1 flex-col items-start">
                              <FormLabel>Columns</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="eg: 1,2,3..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : null}

                    <FormField
                      control={seatingObjectChairForm.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col items-start">
                          <FormLabel>Note</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="eg: Note..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? <LoaderSpin /> : <Plus />}
                        Save Table
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger
              ref={objectRef}
              asChild
            >
              <Button variant={"outline"}>
                <Plus />
                Add Object
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-full overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Seating Objects</DialogTitle>
                <DialogDescription>
                  Add Objects to your canvas
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <Form {...seatingObjectForm}>
                  <form
                    onSubmit={seatingObjectForm.handleSubmit(
                      handleObjectFormSubmit,
                    )}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      control={seatingObjectForm.control}
                      name="seatingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Object Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {seatingTypes?.map((each) => {
                                if (each === "TABLE" || each === "CHAIR") {
                                  return null;
                                }
                                //
                                return (
                                  <SelectItem
                                    key={each}
                                    value={each}
                                  >
                                    {formatSeatingType(each)}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seatingObjectForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col items-start">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="eg: Title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seatingObjectForm.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col items-start">
                          <FormLabel>Width</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="eg: 100..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={seatingObjectForm.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col items-start">
                          <FormLabel>Height</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="eg: 100..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? <LoaderSpin /> : <Plus />}
                        Save Table
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger
              ref={guestRef}
              className="hidden"
            ></DialogTrigger>
            <DialogContent className="max-h-full overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Assign Guests</DialogTitle>
                <DialogDescription>
                  Assign guests to their seats
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <Card>
                  <CardContent className="flex flex-col">
                    {seatingObject?.guestList ? (
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <CardTitle>
                            {seatingObject?.guestList?.name}
                          </CardTitle>
                          <CardDescription>
                            {seatingObject?.guestList?.email}
                          </CardDescription>
                        </div>

                        <Button
                          disabled={isLoading}
                          variant={"destructive"}
                          onClick={() => {
                            handleUnassignGuest(seatingObject?.id);
                          }}
                        >
                          {isLoading && <LoaderSpin />}
                          Dismiss
                        </Button>
                      </div>
                    ) : (
                      <CardDescription className="flex flex-col items-center text-center">
                        <Users className="size-16" />
                        No Guest Assigned
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>

                <Input placeholder="Guests..." />

                <div className="flex flex-col gap-4">
                  {unAssignedguestLists?.map((each) => (
                    <Card key={each?.id}>
                      <CardContent className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <CardTitle>{each?.name}</CardTitle>
                          <CardDescription>
                            {each?.guestGroup?.name ?? "No Group"}
                          </CardDescription>
                        </div>

                        <Button
                          disabled={isLoading}
                          onClick={() => handleAssignGuest(each?.id)}
                        >
                          {isLoading && <LoaderSpin />}
                          Assign
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger
              ref={swapRef}
              className="hidden"
            ></DialogTrigger>
            <DialogContent className="max-h-full overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-1">
                  <ArrowLeftRight />
                  Swap Seats - {seatingObject?.name}
                </DialogTitle>
                <DialogDescription>
                  Select two occupied seats to swap their guests
                </DialogDescription>
              </DialogHeader>

              <SwapObjectDialogComponent />
            </DialogContent>
          </Dialog>

          {/*  */}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* <Button
            className=""
            disabled={isLoading}
            onClick={handleSmartAssignFN}
          >
            <Zap />
            Smart Assign
          </Button> */}

          <SmartAssignSeatingObjectComponent />

          <Button
            variant={"outline"}
            onClick={resetCanvas}
          >
            <RotateCcw />
            Reset
          </Button>

          <Button variant={"outline"}>
            <Download />
            Export
          </Button>

          <Button variant={"outline"}>
            <Printer />
            Print
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        {/*  */}
        <div className="flex flex-col gap-10 lg:order-2 lg:max-w-xs lg:flex-1">
          {/*  */}

          <Tabs
            value={guestAssignTabValue}
            onValueChange={handleGuestAssignTabsChange}
            className="gap-4"
          >
            <TabsList className="h-fit w-full justify-start overflow-x-auto py-4 sm:py-1">
              <TabsTrigger value="UNASSIGNED">
                <Presentation /> UNASSIGNED
              </TabsTrigger>
              <TabsTrigger value="TABLE">
                <Pen /> TABLE
              </TabsTrigger>
            </TabsList>
            <TabsContent value="UNASSIGNED">
              <div className="flex flex-col gap-4">
                {unAssignedguestLists?.map((each) => (
                  <Card key={each?.id}>
                    <CardContent className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <CardTitle>{each?.name}</CardTitle>
                        <CardDescription>
                          {each?.guestGroup?.name ?? "No Group"}
                        </CardDescription>
                      </div>

                      <Badge>{each?.guestGroup?.name ?? "No Group"}</Badge>

                      <DirectAssignSeatingObjectComponent guestList={each} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="TABLE">
              <div className="flex flex-col gap-4">
                {seatingObjects
                  ?.filter(
                    (each) =>
                      each?.seatingType === "TABLE" ||
                      each?.seatingType === "CHAIR",
                  )
                  ?.map((each) => (
                    <Card key={each?.id}>
                      <CardContent>
                        <CardTitle>{each?.name}</CardTitle>
                        <CardDescription>
                          {each?.seatingType === "TABLE" ||
                          (each?.seatingType === "CHAIR" &&
                            each?.chairLayout === "GRID")
                            ? `${each?.subObjects?.filter((eachC) => eachC?.guestListId)?.length ?? 0} / ${each?.subObjects?.length ?? 0} seats`
                            : null}
                        </CardDescription>

                        {/*  */}

                        <div className="flex flex-col gap-2">
                          {each?.seatingType === "TABLE" ||
                          (each?.seatingType === "CHAIR" &&
                            each?.chairLayout === "GRID")
                            ? each?.subObjects
                                ?.filter((eachF) => eachF?.guestListId != null)
                                .map((eachC) => (
                                  <div
                                    className="flex items-center justify-between"
                                    key={`sub-${eachC?.id}`}
                                  >
                                    <p className="">{eachC?.guestList?.name}</p>

                                    <Button
                                      variant={"destructive"}
                                      disabled={isLoading}
                                      onClick={() => {
                                        handleUnassignGuest(eachC?.id);
                                      }}
                                    >
                                      <ArrowBigLeft />
                                    </Button>
                                  </div>
                                ))
                            : null}

                          {/*  */}

                          {each?.seatingType === "CHAIR" &&
                          each?.chairLayout === "SINGLE" &&
                          each?.guestListId ? (
                            <div className="flex items-center justify-between">
                              <p className="">{each?.guestList?.name}</p>

                              <Button
                                variant={"destructive"}
                                disabled={isLoading}
                                onClick={() => {
                                  handleUnassignGuest(each?.id);
                                }}
                              >
                                <ArrowBigLeft />
                              </Button>
                            </div>
                          ) : null}
                        </div>

                        {/*  */}
                      </CardContent>

                      {/*  */}
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/*  */}
        </div>

        <div className="relative flex flex-col gap-4 overflow-auto lg:order-1 lg:flex-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Canvas</CardTitle>
            {isLoading ? <LoaderSpin /> : null}
          </div>

          <div className="flex flex-col overflow-auto border">
            <div className="relative flex min-h-[2000px] min-w-[2000px] resize flex-col overflow-auto">
              {/*  */}
              <div className="absolute top-0 left-0 flex h-full w-full flex-col opacity-25">
                <SeatingCanvasComponent module={moduleD} />
              </div>

              {/*  */}
              {seatingObjects?.map((each) => (
                <ObjectComponent
                  key={each.id}
                  seatingObject={each}
                />
              ))}
            </div>
          </div>
        </div>

        {/*  */}
      </div>

      {/*  */}
    </div>
  );
}
