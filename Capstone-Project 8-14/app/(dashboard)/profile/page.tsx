"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">My Profile</h1>
        <p className="mt-1 text-sm text-ink-400">
          Your account information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              Full Name
            </p>
            <p className="mt-1 text-ink-900">{user.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              Email
            </p>
            <p className="mt-1 text-ink-900">{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Phone
              </p>
              <p className="mt-1 text-ink-900">{user.phone}</p>
            </div>
          )}
          {user.businessName && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Business Name
              </p>
              <p className="mt-1 text-ink-900">{user.businessName}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              Member since
            </p>
            <p className="mt-1 text-ink-900">
              {new Date(user.createdAt).toLocaleDateString("en-PK")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}