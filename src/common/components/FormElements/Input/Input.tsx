import React, { useReducer, useEffect } from "react";
import "./Input.scss";
import { InputReducer } from "./InputReducer";
import { ValidatorConfiguration } from "../../../util/validators";
export interface InputProps {
  id: string;
  label: string;
  elememnt: "input" | "textarea";
  type?: string;
  validators: ValidatorConfiguration[];
  errorText?: string;
  placeholder?: string;
  rows?: number;
  onInput: (id: string, value: string, isValid: boolean) => void;
  initialValue?: string;
  initialValid?: boolean;
}
export const Input: React.FC<InputProps> = ({
  id,
  label,
  elememnt,
  type,
  placeholder,
  rows,
  validators,
  errorText,
  onInput,
  initialValue,
  initialValid,
}) => {
  const [inputState, dispatch] = useReducer(InputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initialValid ? initialValid : false,
    isTouch: false,
  });
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void = (event) => {
    dispatch({
      type: "CHANGE",
      payload: {
        val: event.target.value,
        validators: validators,
      },
    });
  };

  const onTouchHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event) {
      dispatch({
        type: "TOUCH",
      });
    }
  };
  const formElement =
    elememnt === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={(event) => onChangeHandler(event)}
        onBlur={(event) => onTouchHandler(event)}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={(event) => onChangeHandler(event)}
        onBlur={(event) => onTouchHandler(event)}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouch && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {formElement}
      {!inputState.isValid && inputState.isTouch && <p>{errorText}</p>}
    </div>
  );
};
