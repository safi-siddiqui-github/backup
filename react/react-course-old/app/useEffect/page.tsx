"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {});

  return (
    <div className=" flex flex-col gap-4">
      <h2 className="text-xl">Use Effect</h2>

      <div className="flex flex-col gap-1">
        <p>A hook that lets you sync a component with external system</p>
        <p>effects let you run code after rendering</p>
        <p>
          Effects let us specify sideEffects that are caused by rendering
          itself, rather then by a particular event
        </p>
        <p>
          any event that is not user interaction, is an effect that should
          happen on its own
        </p>
        <p>
          
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-lg">Ref</p>
        <p>
          in order to remember some information, but you dont want that info to
          trigger new renders, you can use a ref
        </p>
        <p>
          if we pass 0 as initialValue then useref returns an object with
          current prop as 0
        </p>
        <p>current value is intentionally mutable, react doesnt track it</p>
        <p>Updateing a ref doesnot re-render page, but mutates well</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-lg">Use Case</p>
        <p>Mostly use ref in order to connect to external apis</p>
        <p>Storing timeouts, storing and manipulating dom elements,</p>
        <p>
          If your component need to store some value, but it doesnt impact
          rendering logic
        </p>
      </div>

      <div className="flex flex-col p-2 gap-4">
        <h2 className="text-lg">Examples</h2>

        <div className="flex flex-col">
          <p>1.Increase Zero</p>
          <button
            className="border p-1 w-fit"
            onClick={() => (refZero.current += 1)}
          >
            Increase++ {refZero.current}
          </button>
        </div>

        <div className="flex flex-col items-start">
          <p>2.Input DOM Element</p>
          <input type="text" className="border p-1" ref={inputRef} />
          <button
            className="p-1 border"
            onClick={() => inputRef.current?.focus()}
          >
            Focus
          </button>
        </div>
      </div>
    </div>
  );
}
