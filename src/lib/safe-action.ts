import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: ({ message, name, cause, stack }) => {
    return {
      status: "error",
      message,
      name,
      cause,
      stack,
    };
  },
});
