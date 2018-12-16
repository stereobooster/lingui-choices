import React from "react";

const current = (name, state) => state[name] || [];

const checked = (name, value, state) => current(name, state) === value;

const onChange = (name, value, setState) => () => setState({ [name]: value });

export default function Radio({
  name,
  value,
  children,
  state,
  setState,
  disabled
}) {
  return (
    <label className={disabled ? "disabled" : undefined}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked(name, value, state)}
        onChange={onChange(name, value, setState)}
        disabled={disabled}
      />{" "}
      {children}
    </label>
  );
}

Radio.displayName = "Radio";
