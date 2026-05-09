"use server";

import prisma from "@/prisma/database";
import {
  ChairLayout,
  Prisma,
  SeatingCanvas,
  SeatingObject,
  SeatingType,
  TableShape,
} from "@/prisma/generated";

export async function upsertSeatingObject(
  data: Partial<SeatingObject>,
): Promise<SeatingObject> {
  const {
    id,
    name,
    moduleId,
    guestGroupId,
    note,
    tableShape,
    horizontalAxis,
    verticalAxis,
    width,
    height,
    seatingType,
    guestListId,
    rows,
    columns,
    chairLayout,
  } = data;

  try {
    return await prisma.seatingObject.upsert({
      where: {
        id: id ?? 0,
      },
      create: {
        name,
        moduleId,
        slug: `seating-object-${Date.now()}`,
        seatingType,
        note,
        //
        ...(guestGroupId ? { guestGroupId } : {}),
        ...(tableShape ? { tableShape } : {}),
        //
        ...(rows ? { rows } : {}),
        ...(columns ? { columns } : {}),
        ...(chairLayout ? { chairLayout } : {}),
        //
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
      },
      update: {
        ...(name ? { name } : {}),
        ...(guestGroupId ? { guestGroupId } : {}),
        ...(note ? { note } : {}),
        ...(tableShape ? { tableShape } : {}),
        ...(horizontalAxis ? { horizontalAxis } : {}),
        ...(horizontalAxis === 0 ? { horizontalAxis: 0 } : {}),
        ...(verticalAxis ? { verticalAxis } : {}),
        ...(verticalAxis === 0 ? { verticalAxis: 0 } : {}),
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
        ...(guestListId ? { guestListId } : {}),
        ...(guestListId === 0 ? { guestListId: null } : {}),
        //
        ...(rows ? { rows } : {}),
        ...(columns ? { columns } : {}),
        ...(chairLayout ? { chairLayout } : {}),
        //
        ...(seatingType ? { seatingType } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

export type SeatingObjectWithSubs = Prisma.SeatingObjectGetPayload<{
  include: {
    guestGroup: true;
    guestList: true;
    subObjects: {
      include: {
        guestGroup: true;
        guestList: true;
      };
    };
  };
}>;

export type SeatingSubObjectWithSubs = Prisma.SeatingObjectGetPayload<{
  include: {
    guestGroup: true;
    guestList: true;
  };
}>;

export async function findSeatingObjectWhereModuleId(
  moduleId: number,
): Promise<SeatingObjectWithSubs[]> {
  return await prisma.seatingObject.findMany({
    where: {
      moduleId,
      parentId: {
        equals: null,
      },
    },
    include: {
      guestGroup: true,
      guestList: true,
      subObjects: {
        // where: {
        //   isActive: true,
        // },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          guestGroup: true,
          guestList: true,
        },
      },
    },
  });
}

export async function findSeatingObject(
  id: number,
): Promise<SeatingObjectWithSubs | null> {
  return await prisma.seatingObject.findFirst({
    where: {
      id,
    },
    include: {
      guestGroup: true,
      guestList: true,
      subObjects: {
        // where: {
        //   isActive: true,
        // },
        include: {
          guestGroup: true,
          guestList: true,
        },
      },
    },
  });
}

export async function deleteSeatingObject(id: number): Promise<null> {
  await prisma.seatingObject.delete({
    where: {
      id,
    },
  });
  return null;
}

export async function deleteSeatingObjectWhereModuleId(
  id: number,
): Promise<null> {
  await prisma.seatingObject.deleteMany({
    where: {
      moduleId: id,
    },
  });
  return null;
}

// Seating Objects Children

export async function upsertSeatingObjectWhereQty(
  id: number,
  qty: number,
  seatingType: SeatingType,
): Promise<void> {
  try {
    const seatingObjectCount =
      (await prisma.seatingObject.count({
        where: { parentId: id },
      })) ?? 0;

    // Create extra if needed
    if (qty > seatingObjectCount) {
      for (let i = seatingObjectCount; i < qty; i++) {
        await prisma.seatingObject.create({
          data: {
            slug: `seating-object-${Date.now()}-${i}`,
            name: `seating-object-${i}`,
            parentId: id,
            seatingType,
          },
        });
      }
    }

    // Delete surplus if needed
    if (qty < seatingObjectCount) {
      const toDelete = await prisma.seatingObject.findMany({
        where: { parentId: id },
        orderBy: { createdAt: "desc" }, // delete the latest ones first
        skip: qty, // keep the first `qty`
        select: { id: true },
      });

      await prisma.seatingObject.deleteMany({
        where: { id: { in: toDelete.map((c) => c.id) } },
      });
    }
  } catch (error) {
    throw error;
  }
}

export async function upsertSeatingObjectWhereRowColumn({
  seatingObject,
  seatingType,
}: {
  seatingObject: SeatingObject;
  seatingType: SeatingType;
}): Promise<void> {
  const { id, rows, columns } = seatingObject;
  const qty = (rows ?? 0) * (columns ?? 0);
  //
  try {
    //
    await upsertSeatingObjectWhereQty(id, qty, seatingType);
    //
  } catch (error) {
    throw error;
  }
}

type SeatingSubObjectWithSubObjects = Prisma.SeatingObjectGetPayload<{
  include: {
    subObjects: true;
  };
}>;

export type SmartAssignTypeProps = "ALL" | "GROUP";

export async function handleSmartAssign({
  moduleId,
  eventId,
  type,
}: {
  moduleId: number;
  eventId: number;
  type: "ALL" | "GROUP";
}): Promise<void> {
  try {
    if (!moduleId || !eventId || !type) return;

    // Fetch seating objects with subObjects
    const seatingObjects =
      (await prisma.seatingObject.findMany({
        where: { moduleId, parentId: null },
        include: { subObjects: true },
      })) ?? [];

    // Fetch guests for this event
    const guestLists =
      (await prisma.guestList.findMany({
        where: { module: { eventId } },
      })) ?? [];

    if (seatingObjects.length === 0 || guestLists.length === 0) return;

    // Track assigned guest IDs
    const assignedGuestIds = new Set<number>();
    for (const parent of seatingObjects) {
      if (parent.guestListId) assignedGuestIds.add(parent.guestListId);
      for (const sub of parent.subObjects) {
        if (sub.guestListId) assignedGuestIds.add(sub.guestListId);
      }
    }

    // Helpers
    const getUnassignedGuests = () =>
      guestLists.filter((g) => !assignedGuestIds.has(g.id));

    const getMatchingUnassignedGuests = (groupId: number | null) =>
      guestLists.filter(
        (g) => g.guestGroupId === groupId && !assignedGuestIds.has(g.id),
      );

    const assignSeats = async (
      availableSeats: { id: number }[],
      guests: { id: number }[],
    ) => {
      const limit = Math.min(availableSeats.length, guests.length);
      for (let i = 0; i < limit; i++) {
        await prisma.seatingObject.update({
          where: { id: availableSeats[i].id },
          data: { guestListId: guests[i].id },
        });
        assignedGuestIds.add(guests[i].id);
      }
    };

    // --- Phase 1: Assign by GROUP ---
    for (const parent of seatingObjects) {
      if (parent.seatingType === "TABLE") {
        const availableSeats = parent.subObjects.filter(
          (s) => s.guestListId == null,
        );
        const guests = getMatchingUnassignedGuests(parent.guestGroupId ?? null);
        await assignSeats(availableSeats, guests);
      }

      if (parent.seatingType === "CHAIR") {
        if (parent.chairLayout === "GRID") {
          const availableSeats = parent.subObjects.filter(
            (s) => s.guestListId == null,
          );
          const guests = getMatchingUnassignedGuests(
            parent.guestGroupId ?? null,
          );
          await assignSeats(availableSeats, guests);
        }

        if (parent.chairLayout === "SINGLE" && parent.guestListId == null) {
          const guest = getMatchingUnassignedGuests(
            parent.guestGroupId ?? null,
          )[0];
          if (guest) {
            await prisma.seatingObject.update({
              where: { id: parent.id },
              data: { guestListId: guest.id },
            });
            assignedGuestIds.add(guest.id);
          }
        }
      }
    }

    // --- Phase 2: If type === ALL, fill remaining empty seats with any unassigned guests ---
    if (type === "ALL") {
      const remainingGuests = getUnassignedGuests();
      if (remainingGuests.length > 0) {
        const emptySeats: { id: number }[] = [];

        for (const parent of seatingObjects) {
          if (parent.seatingType === "TABLE") {
            emptySeats.push(
              ...parent.subObjects.filter((s) => s.guestListId == null),
            );
          }
          if (parent.seatingType === "CHAIR") {
            if (parent.chairLayout === "SINGLE" && parent.guestListId == null) {
              emptySeats.push({ id: parent.id });
            }
            if (parent.chairLayout === "GRID") {
              emptySeats.push(
                ...parent.subObjects.filter((s) => s.guestListId == null),
              );
            }
          }
        }

        await assignSeats(emptySeats, remainingGuests);
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function handleSeatingObjectSwap({
  seatingObjectId,
  firstGuestListId,
  secondGuestListId,
}: {
  seatingObjectId: number;
  firstGuestListId: number;
  secondGuestListId: number;
}): Promise<void> {
  try {
    if (!seatingObjectId || !firstGuestListId || !secondGuestListId) {
      return;
    }

    // Find the two children we want to swap
    const [firstChild, secondChild] = await prisma.seatingObject.findMany({
      where: {
        parentId: seatingObjectId,
        guestListId: { in: [firstGuestListId, secondGuestListId] },
      },
      take: 2,
    });

    if (!firstChild || !secondChild) return;

    await prisma.seatingObject.update({
      where: {
        id: firstChild?.id,
      },
      data: {
        guestListId: secondGuestListId,
      },
    });

    await prisma.seatingObject.update({
      where: {
        id: secondChild?.id,
      },
      data: {
        guestListId: firstGuestListId,
      },
    });
    //
  } catch (error) {
    throw error;
  }
}

export async function assignGuestListToSeatingObject({
  seatingObjectId,
  guestListId,
}: {
  seatingObjectId: number;
  guestListId: number;
}): Promise<void> {
  try {
    if (!seatingObjectId || !guestListId) {
      return;
    }
    //
    const seatingObjectFind =
      (await prisma.seatingObject.findFirst({
        where: {
          id: seatingObjectId,
        },
      })) ?? null;
    //
    const guestList =
      (await prisma.guestList.findFirst({
        where: {
          id: guestListId,
        },
      })) ?? null;
    //
    if (!seatingObjectFind || !guestList) {
      return;
    }
    //
    if (seatingObjectFind?.seatingType === "TABLE") {
      await assignGuestListToSeatingObjectSubObjects({
        seatingObjectId,
        guestListId,
      });
    }
    //
    if (seatingObjectFind?.seatingType === "CHAIR") {
      //
      if (seatingObjectFind?.chairLayout === "SINGLE") {
        //
        await prisma.seatingObject.update({
          where: {
            id: seatingObjectFind?.id,
          },
          data: {
            guestListId: guestList?.id,
          },
        });
        //
      }
      //
      if (seatingObjectFind?.chairLayout === "GRID") {
        await assignGuestListToSeatingObjectSubObjects({
          seatingObjectId,
          guestListId,
        });
      }
      //
    }
    //
  } catch (error) {
    throw error;
  }
}

export async function unassignGuestListFromSeatingObject({
  seatingObjectId,
}: {
  seatingObjectId: number;
}): Promise<void> {
  try {
    if (!seatingObjectId) {
      return;
    }
    //
    const seatingObjectFind =
      (await prisma.seatingObject.findFirst({
        where: {
          id: seatingObjectId,
        },
      })) ?? null;
    //
    if (!seatingObjectFind) {
      return;
    }
    //
    await prisma.seatingObject.update({
      where: {
        id: seatingObjectFind?.id,
      },
      data: {
        guestListId: null,
      },
    });
    //
  } catch (error) {
    throw error;
  }
}

export async function assignGuestListToSeatingObjectSubObjects({
  seatingObjectId,
  guestListId,
}: {
  seatingObjectId: number;
  guestListId: number;
}): Promise<void> {
  try {
    if (!seatingObjectId || !guestListId) {
      return;
    }
    //
    const seatingObject =
      (await prisma.seatingObject.findFirst({
        where: {
          id: seatingObjectId,
        },
        include: {
          subObjects: {
            where: {
              guestListId: null,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      })) ?? null;
    //
    const guestList =
      (await prisma.guestList.findFirst({
        where: {
          id: guestListId,
        },
      })) ?? null;
    //
    if (!seatingObject || !guestList) {
      return;
    }
    //
    if (seatingObject?.subObjects?.length === 0) {
      return;
    }
    //
    const firstSubObject = seatingObject?.subObjects[0];
    //
    if (!firstSubObject) {
      return;
    }
    //
    await prisma.seatingObject.update({
      where: {
        id: firstSubObject?.id,
      },
      data: {
        guestListId: guestList?.id,
      },
    });
    //
  } catch (error) {
    throw error;
  }
}

// Seating Canvas

export async function findSeatinCanvasWhereModuleId(
  id: number,
): Promise<SeatingCanvas> {
  let result =
    (await prisma.seatingCanvas.findFirst({
      where: {
        moduleId: id,
      },
    })) ?? null;

  if (!result) {
    result = await prisma.seatingCanvas.create({
      data: {
        name: "seating-canvas",
        moduleId: id,
        slug: `seating-canvas-${Date.now()}`,
      },
    });
  }

  return result;
}

export async function upsertSeatingCanvas(
  data: Partial<SeatingCanvas>,
): Promise<SeatingCanvas> {
  const { id, name, body } = data;

  try {
    return await prisma.seatingCanvas.update({
      where: {
        id: id ?? 0,
      },
      data: {
        ...(name ? { name } : {}),
        ...(body ? { body } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

// Enums
export async function findSeatingTypes(): Promise<SeatingType[]> {
  return Object.values(SeatingType);
}
export async function findTableShapes(): Promise<TableShape[]> {
  return Object.values(TableShape);
}
export async function findChairLayouts(): Promise<ChairLayout[]> {
  return Object.values(ChairLayout);
}
