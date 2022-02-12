import { useReducer } from "react";
import "./App.css";

const initialValues = { backgroundColor: "white" };

const changeColor = (state, action) => {
  switch (action.type) {
    case "change":
      return { backgroundColor: action.color };
    default:
      return state;
  }
};

export function AddColor() {
  const [style, dispatch] = useReducer(changeColor, initialValues);

  return (
    <div className="colorAdder">
      <input
        type="text"
        className="colorInput"
        style={style}
        onChange={(event) => {
          console.log(event.target.value);
          dispatch({ type: "change", color: event.target.value });
        }}
      />
      <button className="addColorButton">Create Color</button>
    </div>
  );
}
