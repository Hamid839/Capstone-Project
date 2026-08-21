import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-ink-900">Create account</h1>
        <p className="mt-1 text-sm text-ink-400">
          Start managing your business ledger
        </p>
      </div>

      <RegisterForm />

      <p className="text-center text-sm text-ink-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brass-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}