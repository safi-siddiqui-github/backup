"use client";
import { ModuleWithSubsTwo } from "@/actions/module";
import { findSeatinCanvasWhereModuleId } from "@/actions/seating";
import { SeatingCanvas } from "@/prisma/generated";
import { Canvas } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

export default function SeatingCanvasComponent(props: {
  module: ModuleWithSubsTwo;
}) {
  //
  const moduleD = props?.module;
  const [isLoading, setIsLoading] = useState(false);
  const [seatingCanvas, setSeatingCanvas] = useState<SeatingCanvas | null>(
    null,
  );
  const divEl = useRef<HTMLDivElement>(null);
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  //
  const findSeatingCanvasFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findSeatinCanvasWhereModuleId(moduleD?.id ?? 0);
    setSeatingCanvas(result);
    setIsLoading(false);
  }, [moduleD]);
  //
  useEffect(() => {
    findSeatingCanvasFN();
  }, [findSeatingCanvasFN]);
  //
  useEffect(() => {
    if (!canvasEl.current || !divEl.current) return;
    //
    const fabricCanvas = new Canvas(canvasEl.current, {
      width: divEl.current.clientWidth,
      height: divEl.current.clientHeight,
      selection: false, // disables group/object selection
      skipTargetFind: true, // prevents selecting objects on click
    });
    //
    setCanvas(fabricCanvas);
    //
    return () => {
      fabricCanvas.dispose();
    };
  }, []);
  //
  const populateSeatingCanvasFN = useCallback(async () => {
    await canvas?.loadFromJSON(seatingCanvas?.body ?? canvas.toJSON());
    await canvas?.requestRenderAll();
  }, [canvas, seatingCanvas]);
  //
  //
  useEffect(() => {
    if (seatingCanvas && canvas) {
      populateSeatingCanvasFN();
    }
  }, [seatingCanvas, canvas, populateSeatingCanvasFN]);
  //
  return (
    // <div className="flex flex-col overflow-auto border">
    <div className="flex flex-1 flex-col">
      <div
        // className="min-h-[2000px] w-full min-w-[2000px]"
        className="h-full w-full"
        ref={divEl}
      >
        <canvas ref={canvasEl} />
      </div>
    </div>
  );
}
