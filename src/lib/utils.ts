import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const questionJSONExample = () => {
  return `{
  "title": "sample 1",
  "totalDuration": 10,
  "durationPerQuestion": 20,
  "startDate": "2025-01-07T18:30:00.000Z",
  "endDate": "2025-01-15T18:30:00.000Z",
  "questions": [
    {
      "content": "This is sample question",
      "questionType": "MULTIPLE_CHOICE",
      "options": [
        "Option 1",
        "Option 2"
      ],
      "correctAnswer": "Option 1",
      "points": 1
    }
  ]
}`;
};
