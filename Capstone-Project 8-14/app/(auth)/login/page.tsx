import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-ink-900">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-400">
          Sign in to your HisabDo account
        </p>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-ink-400">
        Don’t have an account?{" "}
        <Link href="/register" className="font-medium text-brass-600 hover:underline">
          Create one
        </Link>
      </p>

      <p className="text-center text-xs text-ink-400">
        Demo account: <strong>hamid@hisabdo.com</strong> / <strong>123456</strong>
      </p>
    </div>
  );
}