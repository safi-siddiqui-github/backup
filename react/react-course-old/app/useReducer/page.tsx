"use client";

import { useReducer, useState } from "react";

type Task = {
  id: number;
  text: string;
  done: boolean;
};
type Action = {
  type: "add" | "delete" | "edit" | "save" | "done" | "undone";
  id?: number;
  text?: string;
};

function reducer(prevState: Task[], action: Action): Task[] {
  const { text = "", id = 0, type } = action;

  switch (type) {
    case "add":
      {
        const length = prevState.length;
        const lastTask = length > 0 ? prevState[length - 1] : { id: 0 };
        return [
          ...prevState,
          {
            id: lastTask.id + 1,
            text,
            done: false,
          },
        ];

        /*
        import { useImmerReducer } from 'use-immer';
        prevState.push({...})
         */
      }
      break;

    case "delete":
      return prevState.filter((each) => each.id !== id);
      break;

    case "edit":
      {
        const shown = document.querySelector(`#shown-${id}`);
        const hidden = document.querySelector(`#hidden-${id}`);

        shown?.classList.add("hidden");
        shown?.classList.remove("flex");
        hidden?.classList.remove("hidden");
        hidden?.classList.add("flex");

        return prevState;
      }
      break;

    case "save":
      {
        const shown = document.querySelector(`#shown-${id}`);
        const hidden = document.querySelector(`#hidden-${id}`);
        const input = document.querySelector(
          `#input-${id}`
        ) as HTMLInputElement;

        shown?.classList.add("flex");
        shown?.classList.remove("hidden");
        hidden?.classList.remove("flex");
        hidden?.classList.add("hidden");

        return prevState.map((each) => {
          if (each.id === id) {
            each.text = input?.value ?? text;
          }
          return each;
        });
      }

      break;

    case "done":
      return prevState.map((each) => {
        if (each.id === id) {
          each.done = true;
        }
        return each;
      });
      break;

    case "undone":
      return prevState.map((each) => {
        if (each.id === id) {
          each.done = false;
        }
        return each;
      });
      break;

    default:
      return prevState;
      break;
  }
}

export default function Page() {
  function defaultTasks() {
    return [
      {
        id: 1,
        text: "Wake Up",
        done: true,
      },
      {
        id: 2,
        text: "Drink Water",
        done: true,
      },
    ];
  }

  const [tasks, dispatch] = useReducer(reducer, [], defaultTasks);
  const [text, setText] = useState("");

  function handle(type: Action["type"], id = 0) {
    switch (type) {
      case "add":
        dispatch({
          type,
          text,
        });
        break;

      case "delete":
      case "done":
      case "undone":
      case "edit":
      case "save":
        dispatch({
          type,
          id,
        });
        break;

      default:
        break;
    }
  }

  return (
    <div className="">
      <h2 className="text-xl">Use Reducer</h2>

      <div className="py-2"></div>

      <p>Lets us add a reducer to our component</p>
      <p>
        A component having many state update event handlers can get overwhelming
      </p>
      <p>
        Consolidate all the state update logic outside a component in single
        function called reducer
      </p>
      <p>Call it at the top of component</p>
      <p>
        Tird argument is initializer function that shoudl return initial state
      </p>
      <p>dispatch has a stable identity so it can omitted from Effect</p>
      <p>updates and triggers a re-render, but not on identical state</p>
      <p>
        By convention action is object with type property, and should include
        minimal necessary information
      </p>

      <div className="py-2"></div>

      <h2 className="text-lg">Reducer</h2>
      <p>To keep all logic in one-easy-to-access place</p>
      <p>Instead of setting state we dispatch actions</p>
      <p>it has two arguments, currentState and action object</p>
      <p>return the next state from reducer which react will set the state</p>
      <p>instead of if else use switch case</p>
      <p>
        wrap each case in curly brackets so that variables declared inside each
        case dont clash with each other also a case should end with return
      </p>
      <p>reducer is pure function that dont depend on component</p>
      <p>
        They should not send requests, schedule timeouts, or perform any side
        effects (operations that impact things outside the component). They
        should update objects and arrays without mutations.
      </p>
      <p>Dont mutate state , just retunr new state</p>
      <p>
        avoid recreating initial state, by using a function instead of
        initialArgument bcz react saves the initial state once and ignores it on
        next re-renders. To solve this use an initializer function, this way the
        initital state dont get recreated after initialization
      </p>

      <div className="py-2"></div>
      <h2 className="text-lg">useReducer</h2>
      <p>
        it takes two arguments, reducer and initialstate and returns stateful
        value and dispatch function
      </p>
      <p>
        Calling the dispatch function does not change state in the running code, it gives snapshot of old state
      </p>

      <div className="py-2"></div>
      <h2 className="text-lg">useImmerReducer</h2>
      <p>
        reducer must be pure, they should mutate state, but immer provides with
        special draft which is safe to mutate. Under the hood, Immer will create
        a copy of your state with the changes you made to the draft. This is why
        reducers managed by useImmerReducer can mutate their first argument and
        don't need to return state.
      </p>

      <div className="py-2"></div>

      <h2 className="text-lg">Examples</h2>
      <p>1.Tasks</p>
      <input
        type="text"
        className="border p-1"
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <button className="p-1 border" onClick={() => handle("add")}>
        Add
      </button>

      {tasks?.map(({ text, id, done }) => (
        <div className="flex flex-col p-2" key={id}>
          <div className="flex gap-1" id={`shown-${id}`}>
            <p id={`para-${id}`}>
              {text} - {done ? "Done" : "Pending"}
            </p>

            <div className="px-4"></div>

            <button className="p-1 border" onClick={() => handle("delete", id)}>
              Delete
            </button>
            <button className="p-1 border" onClick={() => handle("edit", id)}>
              Edit
            </button>

            {done ? (
              <button
                className="p-1 border"
                onClick={() => handle("undone", id)}
              >
                Undone
              </button>
            ) : (
              <button className="p-1 border" onClick={() => handle("done", id)}>
                Done
              </button>
            )}
          </div>

          <div className="gap-1 hidden" id={`hidden-${id}`}>
            <input
              type="text"
              className="border"
              id={`input-${id}`}
              defaultValue={text}
            />

            <button className="p-1 border" onClick={() => handle("save", id)}>
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
