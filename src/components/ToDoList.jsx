import { Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const ToDoList = ({ toDo }) => {
    const [toDoData, setToDoData] = useState([]);
    const [animate] = useAutoAnimate();
    const [inputVisibility, setInputVisibility] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [activeId, setActiveId] = useState(0);

    useEffect(() => {
        if (toDo && !toDoData.some((element) => element.id === toDo.id)) {
            setToDoData((prev) => [...prev, toDo]);
        }
    }, [toDo]);

    const removeToDo = (id) => {
        setToDoData(toDoData.filter((element) => element.id !== id));
    };

    const isChecked = (id) => {
        setToDoData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    const changeToDoText = () => {
        if (inputValue !== "") {
            setInputVisibility(false);
            setToDoData(
                toDoData.map((element) =>
                    element.id === activeId
                        ? {
                            ...element,
                            text: inputValue,
                            time: new Date().toLocaleTimeString(),
                            edit: true,
                        }
                        : element
                )
            );
        }
    };

    return (
        <>
            <div ref={animate}>
                {toDoData.length > 0 && (
                    <>
                        <button
                            className="text-center w-full bg-red-500 rounded-md py-1 mt-3"
                            onClick={() => setToDoData([])}
                        >
                            Clear
                        </button>
                        <div className="h-px bg-zinc-500 rounded-md my-3" />
                    </>
                )}
            </div>

            <div ref={animate}>
                {inputVisibility && (
                    <form className="flex gap-3 mt-1 mb-3" action="">
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
                            onClick={(e) => {
                                e.preventDefault();
                                changeToDoText();
                            }}
                        >
                            Change
                        </button>
                    </form>
                )}
            </div>

            <ul ref={animate}>
                {toDoData.length > 0 &&
                    toDoData.map((item) => (
                        <li
                            key={item.id}
                            className="bg-zinc-800 border border-zinc-500 rounded-md px-2 py-2 mb-3 flex justify-between"
                        >
                            <div>
                                <h1 className="text-[10px] opacity-35">
                                    {item.time}
                                    {item.edit && " | Edited"}
                                </h1>
                                <p
                                    onClick={() => isChecked(item.id)}
                                    className={
                                        item.isChecked
                                            ? "line-through cursor-pointer"
                                            : "cursor-pointer"
                                    }
                                >
                                    {item.text}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (!inputVisibility) {
                                            setInputVisibility(true)
                                            setActiveId(item.id)
                                            setInputValue(item.text)
                                        } else {
                                            setInputVisibility(false)
                                        }
                                    }}
                                >
                                    <Pencil className="w-5" />
                                </button>
                                <button onClick={() => removeToDo(item.id)}>
                                    <X />
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </>
    );
};

export default ToDoList;
