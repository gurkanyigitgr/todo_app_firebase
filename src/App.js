import React, { useEffect, useState, useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./firebase";
import { showToast } from "./components/Toast";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { ToastContainer } from "react-toastify";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full mx-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100 rounded-lg`,
  buttonSec: `border-none w-[150px] h-[50px] bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg text-white font-semibold`,
  count: `text-center p-2`,
  centeredDiv: `flex flex-col space-y-5 items-center justify-center mt-5 mb-5 md:flex-row md:space-x-10 md:space-y-0`,
};
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const createTodo = async (e) => {
    if (input === "") {
      showToast("You cannot add empty Todo", "error");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
    showToast("Todo successfully added!", "success");
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    showToast("Todo successfully deleted!", "success");
  };
  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (filter === "active") {
          return !todo.completed;
        } else if (filter === "completed") {
          return todo.completed;
        }
        return true;
      }),
    [todos, filter]
  );

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTodo();
          }}
          className={style.form}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              toggleComplete={toggleComplete}
              todo={todo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>You have {todos.length} todos</p>
        )}
        <div className={style.centeredDiv}>
          <button
            className={style.buttonSec}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={style.buttonSec}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button className={style.buttonSec} onClick={() => setFilter("all")}>
            All Todos
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
