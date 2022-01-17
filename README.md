<h1 align="center">Todo List</h1>

![](https://img.shields.io/badge/React-17.0.2-blue)
![](https://img.shields.io/badge/TypeScript-v4.5.2-blue)
![](https://img.shields.io/badge/Redux-4.1.2-blueviolet)
![](https://img.shields.io/badge/Tailwind-3.0.13-blue)

Ce projet a été créé avec [Create React App](https://github.com/facebook/create-react-app), [TypeScript](https://www.typescriptlang.org/), [Redux](https://redux.js.org/) et [Redux Toolkit](https://redux-toolkit.js.org/).

```
npx create-react-app my-app --template redux-typescript
```

## Installation

```
npm install

npm start
```

# Redux

## Slice

**<h3>todoSlice</h3>**

```js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../models";

const initialTodoState: Todo[] = [
  {
    id: 1,
    text: "string",
    completed: "boolean",
  },
];

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push({
        ...action.payload,
      });
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    completedTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, completedTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

Initialisation du slice `todo` avec pour state initial un tableau de `Todo`.
Il comprendra une action `addTodo` pour ajouter une tâche, une fonction `removeTodo` pour enlever une tâche et une action `completedTodo` qui complètera une tâche terminé.

Puis export des actions et du reducer

## Store

```js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    todoSlice: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
```

Mise en place du store avec la slice `todoSlice` et initialisation des variables **AppDispatch** et **RootState** auxquels on affecte l'opérateur `typeof` de **_store.dispatch_** et de **_store.getState_** qui servira pour définir le type des `Hook` utilisé ( Voir section Hook ).

## Hook

```js
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Hook permettant la simplification du code en définissant le type ( définit dans le store ) de la fonction `useAppDispatch` et de `useSelector`.

## Model

```
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
```

Création d'une interface `Todo` qui contiendra les éléments nécessairent à la création des tâches.

# Composants

## TodoList

```js
const TodoList = () => {
  const todoList = useAppSelector((state) => state.todoSlice);

  return (
    <div className="flex justify-center">
      <ul className="mt-12 bg-white rounded-md py-5">
        {todoList.map((todo) => (
          <li
            className="text-black flex justify-center p-3  w-96 "
            key={todo.id}
          >
            <Todo todo={todo.text} id={todo.id} completed={todo.completed} />
          </li>
        ))}
      </ul>
    </div>
  );
};
```

Initialisation de la variable todoList à laquelle on affecte la fonction useSelector qui retournera le state actuel de `todoSlice`, un tableau vide.

Itération sur `todoList` qui retournera toute les tâches entrée par l'utilisateur.

## Todo

```js
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
```

Création d'une interface `Props` qui contiendra un **id** (number), une **tâche**(string) et **completed:** si la tâche est complété ou non (boolean).

Création des boutons qui permettront d'enlever ou de complété une tâche grâce à l'event handler `onClick` qui retournera l'action à effectuer.

## inputField

```js
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
```

Création d'une interface `Props` qui contiendra un text(string) et une fonction.
Ce composant prend en charge l'ajout d'une tâche grâce à la fonction `handleAddTodo` qui prendra en paramètre `e: React.FormEvent`.

Initialisation de la variable newTodo à laquel on affecte un objet qui contiendra le text, completed et un id. Puis, on dispatch l'action (`dispatch(addTodo(newTodo))`), on empêche la page de se mettre à jour (`e.preventDefault()`) quand on valide le formulaire et on remet le champ du formulaire vide `setText("")`.
