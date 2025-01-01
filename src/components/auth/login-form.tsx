// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";

// const LoginForm = () => {
//   return (
//     <div className="grid gap-4">
//       <div className="grid gap-2">
//         <Label htmlFor="email">Email</Label>
//         <Input id="email" type="email" placeholder="m@example.com" required />
//       </div>
//       <div className="grid gap-2">
//         <div className="flex items-center justify-between">
//           <Label htmlFor="password">Password</Label>
//           <Link
//             href="/auth/forgot-password"
//             className="text-muted-foreground underline underline-offset-2"
//           >
//             Forgot Password?
//           </Link>
//         </div>
//         <Input id="password" type="password" placeholder="********" />
//       </div>
//       <Button type="submit" className="w-full">
//         Login to your account
//       </Button>
//     </div>
//   );
// };

// export default LoginForm;

"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GithubIcon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="m@example.com"
                  {...field}
                  // className="bg-gray-900 border-gray-700"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex items-center justify-between">
                  Password
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-gray-300"
                  >
                    Forgot Password?
                  </a>
                </div>
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-5">
          Login to your account
        </Button>
      </form>
    </Form>
  );
}
