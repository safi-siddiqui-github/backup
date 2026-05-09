"use client";

import { useState } from "react";

export default function Page() {
  const [counter, setCounter] = useState(0);

  // Initializer function must be pure
  const [clicked, setClicked] = useState(() => 0);

  const [text, setText] = useState("");

  const [favourite, setFavourite] = useState(true);

  return (
    <div className="">
      <h2 className="text-xl">Use State</h2>

      <div className="py-2"></div>

      <p>Call useState at the top level of component</p>
      <p>Initial value can be any type</p>
      <p>Usestate returns two value, initial state and set function</p>

      <div className="py-2"></div>

      <h2 className="text-lg">Caveats</h2>
      <p>as its a hook Cant call it in loops and conditions</p>

      <div className="py-2"></div>

      <h2 className="text-lg">Set function</h2>
      <p>Set updates the value and trigger a re-render</p>
      <p>If you pass a function as nextState</p>
      <p>
        If new value is same as old, react will skip re-render due to
        optimization
      </p>
      <p>
        It updates the screen after all event handlers have run and called their
        set function. this prevents multiple re-renders during single events
      </p>
      <p>In order to force screen to update, use flushSync</p>
      <p>
        Set function has stable identity so it can be omitted from Effect
        dependencies, but including it will not cause Effect to fire
      </p>

      <div className="py-2"></div>

      <h2 className="text-lg">Examples</h2>
      <p>1.Buttons</p>

      <button
        onClick={() => {
          setCounter((pendingState) => pendingState + 5);
          setClicked((pendingState) => pendingState + 1);
        }}
        className="border p-2"
      >
        Counter +5 ({counter})
      </button>

      <button className="border p-2">Clicked ({clicked})</button>

      <button
        onClick={() => {
          setCounter(0);
          setClicked(0);
        }}
        className="border p-2"
      >
        Reset
      </button>

      <div className="py-2"></div>

      <p>2.Text Field</p>
      <p className="">{text}</p>
      <input
        type="text"
        className="border p-1"
        onChange={(e) => setText(e.currentTarget.value)}
      />

      <div className="py-2"></div>

      <p>3.Checkbox</p>
      <p className="">Favourite {String(favourite)}</p>
      <input
        type="checkbox"
        className="border size-4"
        checked={favourite}
        onChange={(e) => setFavourite(e.currentTarget.checked)}
      />
    </div>
  );
}
