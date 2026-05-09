"use client";

import { useEffect, useRef } from "react";

export default function Page() {
  const refZero = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Dont use during rendering
  // ref.current = 123

  useEffect(() => {
    // This is good practice
    // ref.current = 123
  });

  return (
    <div className=" flex flex-col gap-4">
      <h2 className="text-xl">Use Ref</h2>

      <div className="flex flex-col gap-1">
        <p>
          A hook that lets you reference avalue thats not needed for rendering
        </p>
        <p>initial value is set inside its object for current prop</p>
        <p>refs are plain js objects, so react doesnt know when it changes</p>
        <p>
          Dont mutate while in render (meaning openly in component), use effects
          or handlers
        </p>
        <p>
          Avoid recreating ref contents, react saves the initial value once and
          ignores it on next render
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
