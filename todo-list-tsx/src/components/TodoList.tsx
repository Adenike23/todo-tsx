import React from "react";
import "./styles.css";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList = ({
  todos,
  setTodos,
}: Props) => {
  return (
    <div className="container">
            <div className='todos'>
          <span className="todos__heading">Active Tasks</span>
          {todos.map((t) => (
            <SingleTodo t={t} key={t.id} todos={todos} setTodos={setTodos} />
          ))}
        </div>
      {/* <Droppable droppableId="TodosRemove">
        {
          (provided, snapshot) => (
            <div className={`todos remove ${snapshot.isDraggingOver? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((t, index) => (
              <SingleTodo index={index} t={t} key={t.id} todos={completedTodos} setTodos={setCompletedTodos} />
            ))}
            {provided.placeholder}
          </div>
          )
        }
      </Droppable>  */}
    </div>
  );
};

export default TodoList;
