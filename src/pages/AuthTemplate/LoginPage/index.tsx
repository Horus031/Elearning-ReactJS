"use client";

import { AuthForm } from "@/components/AuthTemplate/AuthForm";
import { loginApi } from "@/services/user.api";
import { useAuthStore } from "@/store/auth.store";
import type { LoginDataRequest } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: (data: LoginDataRequest) => loginApi(data),
    onMutate: () => setIsLoading(true),
    onSuccess: (currentUser) => {
      setIsLoading(false);
      if (currentUser) {
        setUser(currentUser)

        navigate(currentUser.maLoaiNguoiDung === "HV" ? "/" : "admin")
      }
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleLogin = (data: LoginDataRequest) => {
    mutate(data)
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-400">
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-br from-card/50 to-background">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <NavLink to="/" className="flex items-center space-x-2">
                <BookOpen className="h-10 w-10 text-primary" />
                <span className="text-3xl font-bold text-primary">
                  LearnHub
                </span>
              </NavLink>
              <h1 className="text-4xl font-bold text-balance">
                Continue Your Learning Journey
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Access your courses, track your progress, and continue building
                the skills that matter most to your career.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">✓</span>
                </div>
                <span>Access to all your enrolled courses</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">✓</span>
                </div>
                <span>Track your learning progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">✓</span>
                </div>
                <span>Download certificates</span>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div>
            <AuthForm
              mode="login"
              onSubmit={handleLogin}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
