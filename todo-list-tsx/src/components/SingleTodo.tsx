import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  t: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

const SingleTodo = ({ t, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(t.todo);

  const handleDone = (id: number) => {
    // ...t means we're taking all of the ppties of that particular todo and change a particular ppty(isDone in this case)
    setTodos(todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)));
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map((t) => (t.id === id ? { ...t, todo: editTodo } : t)));
    setEdit(false);
  };
  //whenever the 'edit' changes, this useEffect fires of
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Draggable draggableId={t.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, t.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : t.isDone ? (
            <s className="todos__single--text">{t.todo}</s>
          ) : (
            <span className="todos__single--text">{t.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                //if edit is not on & isDone is not done, then setEdit to close
                if (!edit && !t.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(t.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(t.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
