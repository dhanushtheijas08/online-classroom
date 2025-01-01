"use client";
import React, { ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";

type SpinnerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconSize?: number;
  disabledText?: string;
  children?: React.ReactNode;
};

const SpinnerButton = ({
  iconSize = 4,
  disabledText,
  children,
  ...props
}: SpinnerButtonProps) => {
  return (
    <Button {...props}>
      {props.disabled && (
        <div className={`relative h-${iconSize} w-${iconSize}`}>
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 h-[8%] w-[24%] bg-zinc-100 dark:bg-zinc-900 rounded-sm animate-sonner-spin"
              style={{
                transform: `rotate(${index * 30}deg) translate(146%)`,
                animationDelay: `-${1.2 - index * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      )}
      {props.disabled && disabledText ? (
        <span className="ml-2">{disabledText}</span>
      ) : (
        children
      )}
    </Button>
  );
};

export default SpinnerButton;
