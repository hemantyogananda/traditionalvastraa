import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

export const metadata = { title: "Admin Sign In" };

export default function AdminLoginPage() {
  return (
    <div className="container-px py-16">
      <Suspense fallback={null}>
        <AuthForm variant="admin" />
      </Suspense>
    </div>
  );
}
