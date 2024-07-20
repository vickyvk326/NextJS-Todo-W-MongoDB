import React from "react";

const Todo = ({
  id,
  title,
  description,
  status,
  mongoId,
  deleteTodo,
  completedTodo,
}) => {
  return (
    <tr className="bg-white border-b ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        {id}
      </th>
      <td className={`px-6 py-4 ${status ? "line-through" : ""}`}>{title}</td>
      <td className={`px-6 py-4 ${status ? "line-through" : ""}`}>
        {description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{status ? "Completed ✔" : "Pending ⏳"}</td>
      <td className="px-6 py-4 flex gap-1">
        <buton
          className="py-2 px-4 bg-red-500 w-[5rem] text-white rounded-md cursor-pointer"
          onClick={() => deleteTodo(mongoId)}
        >
          Delete
        </buton>
        <buton
          className="py-2 px-4 bg-green-500 w-[5rem] text-white rounded-md cursor-pointer"
          onClick={() => completedTodo(mongoId)}
        >
          {status ? "Undone" : "Done"}
        </buton>
      </td>
    </tr>
  );
};

export default Todo;
