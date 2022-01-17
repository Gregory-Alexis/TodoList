import { useAppSelector } from "../app/hooks";
import Todo from "./Todo";

const TodoList = () => {
  const todoList = useAppSelector((state) => state.todoSlice);

  return (
    <div className="flex justify-center">
      <ul className="mt-12 bg-white rounded-md py-5">
        {todoList.map((todo) => (
          <li
            className="text-black flex justify-center p-3  w-96"
            key={todo.id}
          >
            <Todo todo={todo.text} id={todo.id} completed={todo.completed} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
