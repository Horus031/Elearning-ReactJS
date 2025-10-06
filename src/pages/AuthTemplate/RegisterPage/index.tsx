import { AuthForm } from "@/components/AuthTemplate/AuthForm";
import { BookOpen, Users, Award, Clock } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/services/user.api";
import type { LoginDataRequest, RegisterDataRequest } from "@/types/auth";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (data: RegisterDataRequest) => registerApi(data),
    onMutate: () => setIsLoading(true),
    onSuccess: () => {
      setIsLoading(false);
      router("/auth/login");
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleRegister = (data: RegisterDataRequest | LoginDataRequest) => {
    if (
      "hoTen" in data &&
      "soDT" in data &&
      "maNhom" in data &&
      "email" in data
    ) {
      mutate(data);
    }
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
                Start Your Learning Adventure
              </h1>
              <p className="text-xl text-muted-foreground text-pretty">
                Join thousands of learners worldwide and gain the skills you
                need to advance your career.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center space-y-2">
                <Users className="h-8 w-8 text-primary mx-auto" />
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Students
                </div>
              </div>
              <div className="text-center space-y-2">
                <Award className="h-8 w-8 text-primary mx-auto" />
                <div className="text-2xl font-bold text-primary">1,200+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center space-y-2">
                <Clock className="h-8 w-8 text-primary mx-auto" />
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Access</div>
              </div>
              <div className="text-center space-y-2">
                <BookOpen className="h-8 w-8 text-primary mx-auto" />
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div>
            <AuthForm
              mode="register"
              onSubmit={handleRegister}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
