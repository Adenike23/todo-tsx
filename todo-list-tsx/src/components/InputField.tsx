import React, { useEffect, useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  // used to manipulate the input field
  const inputRef = useRef<HTMLInputElement>(null);
//   useEffect(() => {
//     Focus on the input field when the component mounts
//     inputRef.current?.focus();
//   }, []);
  return (
    <form className="input" onSubmit={(e) => {
        handleAdd(e)
        //helps to remove the focus/active mode from the input field. this then removes the blur background
        inputRef.current?.blur()
        }}>
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter a task"
        className="input__box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
