"use client";
import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useState,
} from "react";
import { Button } from "../layout";
import { MdClear } from "react-icons/md";

export type T_TextInput = {
  icon?: ReactNode;
  buttonCallback?: (e: string) => void;
  handleCancel?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput: FC<T_TextInput> = ({
  icon,
  buttonCallback,
  onChange,
  handleCancel,
  children,
  className,
  defaultValue,
  ...attributes
}) => {
  const [value, setValue] = useState(defaultValue?.toString() || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    setValue(e.target.value);
  };

  const handleButtonClick = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    buttonCallback && buttonCallback(value);
  };

  const handleClearInput = () => {
    setValue("");
    handleCancel && handleCancel();
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value === "") {
        handleCancel && handleCancel();
      } else {
        handleButtonClick();
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      handleClearInput();
    }
  };

  return (
    <label className="w-full flex flex-col justify-start items-start">
      <span className="w-full">{children}</span>
      <div className="w-full flex justify-stretch items-stretch">
        <div className="w-full relative">
          <input
            className={`w-full border-2 border-black px-2 py-1 ${
              icon ? "rounded-l-lg" : "rounded-lg"
            } ${className}`}
            onChange={handleChange}
            value={value}
            onKeyDown={handleKeydown}
            {...attributes}
          />

          {value && (
            <button
              aria-label="clear input"
              className="absolute right-0 top-0 h-full mr-2"
              onClick={handleClearInput}
            >
              <MdClear />
            </button>
          )}
        </div>

        {icon && (
          <Button
            className={`rounded-l-none px-6`}
            onClick={handleButtonClick}
            name="input button"
            aria-label="input button"
          >
            {icon}
          </Button>
        )}
      </div>
    </label>
  );
};

export default TextInput;
