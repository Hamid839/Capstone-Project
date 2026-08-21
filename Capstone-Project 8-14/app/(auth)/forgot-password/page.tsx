"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-ink-900">Forgot password</h1>
        <p className="mt-1 text-sm text-ink-400">
          Enter your email and we’ll send you a reset link
        </p>
      </div>

      {submitted ? (
        <div className="rounded-md bg-credit-50 px-4 py-6 text-center text-sm text-credit">
          If an account exists for <strong>{email}</strong>, a reset link has been
          sent. (This is a demo UI only.)
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-ink-400">
        <Link href="/login" className="text-brass-600 hover:underline">
          ← Back to login
        </Link>
      </p>
    </div>
  );
}