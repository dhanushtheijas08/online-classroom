"use client";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Badge } from "../ui/badge";

const TagInput = ({ onValueChange }: { onValueChange: any }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTags((prev) => [...prev, inputValue.trim()]);
      onValueChange([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return;
    setInputValue(e.target.value);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "flex relative h-10 w-full rounded-md border border-input bg-background py-1.5 px-3 text-base",
        isInputFocused &&
          "ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground outline-none ring-2 ring-ring ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      )}
    >
      <div className="flex gap-0.5">
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
      </div>

      <input
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        value={inputValue}
        ref={inputRef}
        className="focus-visible:outline-none ml-1 w-full"
        onBlur={() => setIsInputFocused(false)}
        onFocus={() => setIsInputFocused(true)}
      />
    </div>
  );
};

export default TagInput;
