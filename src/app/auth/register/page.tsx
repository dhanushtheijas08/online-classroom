import Link from "next/link";
import AuthCard from "@/components/auth/auth-card";
import RegisterForm from "@/components/auth/register-form";

const RegisterFooter = () => (
  <div className="text-center text-sm">
    Already have an account?{" "}
    <Link href="/auth/login" className="underline">
      Sign in
    </Link>
  </div>
);

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <AuthCard
        heading="Create an account"
        footerDescription={<RegisterFooter />}
        shouldShowScoialAuth={true}
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
