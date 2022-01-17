import { useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [text, setText] = useState<any>("");
  const style = {
    backgroundImage:
      "linear-gradient(to right, rgb(204, 43, 94), rgb(117, 58, 136))",
  };
  return (
    <div className="min-h-screen" style={style}>
      <InputField text={text} setText={setText} />
      <TodoList />
    </div>
  );
};

export default App;
