import React from "react";
import { useAppDispatch } from "../app/hooks";
import { addTodo } from "../features/todo/todoSlice";
import Done from "../images/done.svg";

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: React.FC<Props> = ({ text, setText }) => {
  const dispatch = useAppDispatch();
  const handleAddTodo = (e: React.FormEvent) => {
    const newTodo = { text, completed: false, id: Date.now() };
    dispatch(addTodo(newTodo));
    e.preventDefault();
    setText("");
  };

  return (
    <form
      className="flex justify-center items-center pt-60"
      onSubmit={handleAddTodo}
    >
      <div className="relative">
        <input
          className="w-96 p-3 rounded-md outline-none pl-6"
          placeholder="Entrez une tâche"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="absolute right-0">
          <img src={Done} alt="valider" />
        </button>
      </div>
    </form>
  );
};

export default InputField;
