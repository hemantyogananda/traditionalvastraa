"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Variant = "customer" | "admin";

export default function AuthForm({ variant }: { variant: Variant }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || (variant === "admin" ? "/admin" : "/account");
  const errorParam = searchParams.get("error");

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === "auth-failed" ? "Google sign-in failed. Please try again." : null
  );
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setError(null);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (oauthError) setError(oauthError.message);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setSubmitting(true);
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (signUpError) throw signUpError;

        if (!data.session) {
          setInfoMessage("Check your email to confirm your account, then sign in.");
          setMode("signin");
          setSubmitting(false);
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }

      if (variant === "admin") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user?.id)
          .single();

        if (!profile?.is_admin) {
          await supabase.auth.signOut();
          throw new Error("This account doesn't have admin access.");
        }
      }

      router.push(next);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="card p-8">
        <h1 className="font-serif text-2xl font-semibold text-maroon-dark">
          {variant === "admin" ? "Admin Sign In" : mode === "signin" ? "Sign In" : "Create Account"}
        </h1>
        <p className="mt-1 text-sm text-maroon-dark/60">
          {variant === "admin"
            ? "Restricted to store staff."
            : mode === "signin"
              ? "Welcome back to Traditional Vastraa."
              : "Join us for a faster checkout and order tracking."}
        </p>

        {error && <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {infoMessage && (
          <div className="mt-4 rounded-lg border border-sage/30 bg-sage/10 p-3 text-sm text-sage">{infoMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {variant === "customer" && mode === "signup" && (
            <input
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-field"
            />
          )}
          <input
            required
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            required
            type="password"
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Please wait…" : variant === "admin" ? "Sign In" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-maroon-dark/40">
          <div className="h-px flex-1 bg-maroon/10" />
          OR
          <div className="h-px flex-1 bg-maroon/10" />
        </div>

        <button type="button" onClick={handleGoogleSignIn} className="btn-secondary w-full">
          Continue with Google
        </button>

        {variant === "customer" ? (
          <p className="mt-6 text-center text-sm text-maroon-dark/60">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setError(null);
                setInfoMessage(null);
                setMode(mode === "signin" ? "signup" : "signin");
              }}
              className="font-semibold text-maroon hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-maroon-dark/60">
            Not staff?{" "}
            <Link href="/login" className="font-semibold text-maroon hover:underline">
              Customer sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
