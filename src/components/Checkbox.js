import React from "react";

const current = (name, state) => state[name];

const checked = (name, state) => current(name, state) === true;

const onChange = (name, state, setState) => () =>
  setState({ [name]: !state[name] });

// boolean checkbox
export default function Checkbox({
  name,
  children,
  state,
  setState,
  disabled
}) {
  return (
    <label className={disabled ? "disabled" : undefined}>
      <input
        type="checkbox"
        name={name}
        checked={checked(name, state)}
        onChange={onChange(name, state, setState)}
        disabled={disabled}
      />{" "}
      {children}
    </label>
  );
}

Checkbox.displayName = "Checkbox";

// Array checkbox
// const checked = (name, value, state) =>
//   current(name, state).indexOf(value) > -1;

// const onChange = (name, value, state, setState) => () =>
//   checked(name, value, state)
//     ? setState({ [name]: current(name, state).filter(x => x !== value) })
//     : setState({ [name]: [...current(name, state), value] });
