"use client";
import { ModuleWithSubsTwo } from "@/actions/module";
import {
  findSeatinCanvasWhereModuleId,
  upsertSeatingCanvas,
} from "@/actions/seating";
import { Button } from "@/components/ui/button";
import { SeatingCanvas } from "@/prisma/generated";
import { Canvas, Circle, PencilBrush, Rect } from "fabric";
import { RotateCcw, Save, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import LoaderSpin from "../LoaderSpin";

export default function SeatingLayout(props: { module: ModuleWithSubsTwo }) {
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
  const populateSeatingCanvasSettingFN = useCallback(async () => {
    if (canvas) {
      // canvas.isDrawingMode = true;
    }
  }, [canvas]);
  //
  useEffect(() => {
    if (seatingCanvas && canvas) {
      populateSeatingCanvasFN();
      populateSeatingCanvasSettingFN();
    }
  }, [
    seatingCanvas,
    canvas,
    populateSeatingCanvasFN,
    populateSeatingCanvasSettingFN,
  ]);
  //
  const addRectangle = useCallback(async () => {
    const table = new Rect({
      name: "reactangle-1",
      width: 150,
      height: 80,
      stroke: "black",
      fill: "transparent",
      rx: 10,
      ry: 10,
    });
    canvas?.add(table);
    // canvas?.centerObject(table);
  }, [canvas]);
  //
  const addCircle = useCallback(async () => {
    const table = new Circle({
      name: "circle-1",
      radius: 50,
      stroke: "black",
      fill: "transparent",
    });
    canvas?.add(table);
    // canvas?.centerObject(table);
  }, [canvas]);
  //
  const saveCanvas = useCallback(async () => {
    setIsLoading(true);
    const json = canvas?.toJSON();
    const result = await upsertSeatingCanvas({
      id: seatingCanvas?.id,
      body: json,
    });
    setSeatingCanvas(result);
    setIsLoading(false);
    //
  }, [canvas, seatingCanvas]);
  //
  const handleDelete = useCallback(() => {
    if (canvas) {
      const active = canvas.getActiveObject();

      if (active) {
        canvas.remove(active);
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    }
  }, [canvas]);
  //
  const handleClear = useCallback(() => {
    if (canvas) {
      canvas.clear();
    }
  }, [canvas]);
  //
  const toggleDrawingMode = useCallback(() => {
    if (canvas) {
      canvas.isDrawingMode = !canvas.isDrawingMode;

      if (canvas.isDrawingMode) {
        const pencil = new PencilBrush(canvas);
        pencil.width = 2;
        pencil.color = "#000000";
        canvas.freeDrawingBrush = pencil;
      }
    }
  }, [canvas]);
  //
  return (
    <div className="flex flex-col gap-10">
      {/*  */}
      <div className="flex flex-col gap-4">
        {/*  */}
        <div className="flex items-center justify-between gap-2">
          {/*  */}
          <div className="flex items-center gap-2">
            {isLoading && <LoaderSpin />}
            <Button
              disabled={isLoading}
              onClick={addRectangle}
            >
              Add Rectangle
            </Button>
            <Button
              disabled={isLoading}
              onClick={addCircle}
            >
              Add Circle
            </Button>
            <Button
              disabled={isLoading}
              variant={"outline"}
              onClick={toggleDrawingMode}
            >
              Toggle Drawing Mode
            </Button>
          </div>

          {/*  */}
          <div className="flex items-center gap-2">
            <Button
              disabled={isLoading}
              onClick={handleDelete}
              variant={"outline"}
            >
              <Trash />
              Delete
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleClear}
              variant={"outline"}
            >
              <RotateCcw />
              Clear
            </Button>
            <Button
              disabled={isLoading}
              onClick={saveCanvas}
            >
              <Save />
              Save
            </Button>
          </div>
        </div>

        {/*  */}
      </div>

      {/*  */}
      <div className="flex flex-col overflow-scroll border">
        <div
          className="min-h-[2000px] w-full min-w-[2000px] resize overflow-hidden"
          ref={divEl}
        >
          <canvas ref={canvasEl} />
        </div>
      </div>
    </div>
  );
}
