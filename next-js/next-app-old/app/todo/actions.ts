'use server'
import axios from "axios";

export async function ListTodo() {

    const data = await axios.get('http://expressjs:3000/todo')
    const todos = await data.data
    const todosData = todos.data;

    return todosData;
}

export async function AddTodo(formData: FormData) {

    const todo = formData.get('todo')
    const res = await axios.post('http://expressjs:3000/todo', {todo})

    console.log(res.data.msg);
    
}

export async function DeleteTodo(formData: FormData) {

    const id = formData.get('id')
    const res = await axios.delete(`http://expressjs:3000/todo/${id}`)

    console.log(res.data.msg);
    
}