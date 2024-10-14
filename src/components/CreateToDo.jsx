import { useState } from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid"

const CreateToDo = () => {
    const [inputValue, setInputValue] = useState("")
    const [toDoData, setToDoData] = useState([])

    const createToDo = (e) => {
        e.preventDefault()
        if (inputValue) {
            setToDoData(prev => [...prev, { id: uuidv4(), text: inputValue, isChecked: false, time: new Date().toLocaleTimeString(), edit: false }])
            setInputValue("")
        }
    }

    return (
        <>
            <label htmlFor="toDoInput" className="italic font-bold">
                ToDo List
            </label>
            <form className="flex gap-3 mt-1" action="">
                <input
                    type="text"
                    className="w-full bg-zinc-800 border border-zinc-500 focus:outline-none rounded-md px-2 py-2"
                    autoComplete="off"
                    id="toDoInput"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    className="px-5 py-2 bg-green-600 rounded-md border border-green-300 hidden sm:block"
                    onClick={(e) => createToDo(e)}
                >
                    Add
                </button>
            </form>
            {
                toDoData != 0 && <ToDoList toDo={toDoData[toDoData.length - 1]} />
            }
        </>
    );
};

export default CreateToDo;
