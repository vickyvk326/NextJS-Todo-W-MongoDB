"use client";
import Todo from "@/components/Todo";
import { useEffect, useState } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoList, setTodoList] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (formData.title && formData.description) {
        const response = await axios.post("/api", formData);
        toast.success(response.data.message);
        setFormData({ title: "", description: "" });
        fetchData();
      }
    } catch (e) {
      toast.error("Error: " + e.message);
    }
  };

  const fetchData = async () => {
    const res = await axios.get("/api");
    setTodoList(res.data.todos);
  };

  const deleteTodo = async (mongoId) => {
    try {
      const response = await axios.delete("/api", {
        params: {
          mongoId,
        },
      });
      toast.success(response.data.message);
      fetchData();
    } catch (e) {
      toast.error("Error: " + e.message);
    }
  };

  const completedTodo = async (mongoId) => {
    try {
      const response = await axios.put(
        "/api",
        {},
        {
          params: {
            mongoId,
          },
        }
      );
      toast.success(response.data.message);
      fetchData();
    } catch (e) {
      toast.error("Error: " + e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-start gap-2 w-[80%] max-w-[600px] mx-auto mt-24 px-2"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          className="px-3 py-3 border-2 w-full rounded-md"
          value={formData.title}
          onChange={onChangeHandler}
        />
        <textarea
          name="description"
          placeholder="Enter description"
          className="px-3 py-3 border-2 w-full rounded-md"
          value={formData.description}
          onChange={onChangeHandler}
        ></textarea>
        <button
          type="submit"
          className="px-11 py-3 bg-orange-600 text-white rounded-md"
        >
          Add todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!!todoList.length &&
              todoList.map((todo, index) => (
                <Todo
                  key={index}
                  id={index + 1}
                  title={todo.title}
                  description={todo.description}
                  status={todo.isCompleted}
                  mongoId={todo._id}
                  deleteTodo={deleteTodo}
                  completedTodo={completedTodo}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
