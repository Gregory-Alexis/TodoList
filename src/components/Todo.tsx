import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineDoneAll } from "react-icons/md";
import { useAppDispatch } from "../app/hooks";
import { completedTodo, removeTodo } from "../features/todoSlice";

interface Props {
  todo: string;
  id: number;
  completed: boolean;
}

const Todo: React.FC<Props> = ({ todo, id, completed }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-80 py-5 bg-primary text-yellow-300 text-left px-3 flex justify-between rounded-md">
      <span className={completed ? "line-through" : " "}>{todo}</span>

      <div className="flex items-center justify-center">
        <button
          className="pr-3 hover:text-red-500"
          onClick={() => dispatch(removeTodo(id))}
        >
          <FaTrashAlt />
        </button>
        <button
          className="hover:text-green-500"
          onClick={() => dispatch(completedTodo(id))}
        >
          <MdOutlineDoneAll />
        </button>
      </div>
    </div>
  );
};

export default Todo;
