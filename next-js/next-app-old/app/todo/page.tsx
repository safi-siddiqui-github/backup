'use client'

import { useEffect, useState } from "react";
import { AddTodo, DeleteTodo, ListTodo } from "./actions";

export default function Page() {

    const [data, setData] = useState([]);

    useEffect(() => {

        const doThis = async() => {
            const a = await ListTodo()
            setData(a)
        }

        doThis();

    }, [])

    if(!data) return null;
    
    return (
        <div className="p-6 flex flex-col gap-2">
            <h2 className="text-xl">Todo App</h2>

            <form action={AddTodo} className="flex gap-2">
                
                <input type="text" className=" rounded border px-2 py-1" name="todo" />

                <button className="rounded bg-slate-100 px-2 py-1 cursor-pointer" type="submit">Add Todo</button>
                
            </form>

            {data.map((each: {_id: string, name: string}) => (
                <form key={each._id} className="flex gap-1" action={DeleteTodo}>
                    <p>{each.name}</p>
                    <input type="hidden" name="id" value={each._id} />
                    <button className="bg-red-100 px-1 cursor-pointer" type="submit">Delete</button>
                </form>
            ))}

        </div>
    )
}