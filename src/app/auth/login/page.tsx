import Link from "next/link";
import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";

const LoginFooter = () => (
  <div className="text-center text-sm">
    Dont have an account?{" "}
    <Link href="/auth/register" className="underline">
      Sign up
    </Link>
  </div>
);

export default function LoginPage() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <AuthCard
        heading="Welcome Back"
        footerDescription={<LoginFooter />}
        shouldShowScoialAuth={true}
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
