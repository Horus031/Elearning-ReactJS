import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { AuthFormProps } from "@/types/auth";

export function AuthForm({ mode, onSubmit, isLoading = false }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maNhom: "GP01",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {mode === "login" ? "Chào mừng bạn trở lại" : "Tạo tài khoản của bạn"}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Đăng nhập để khám phá các khóa học"
            : "Tham gia hàng ngàn khóa học uy tín và bắt đầu hành trình hôm nay"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="taiKhoan">Tài khoản</Label>
            <Input
              id="taiKhoan"
              type="taiKhoan"
              placeholder="Nhập tài khoản của bạn"
              value={formData.taiKhoan}
              onChange={(e) => handleInputChange("taiKhoan", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="matKhau">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="matKhau"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.matKhau}
                onChange={(e) => handleInputChange("matKhau", e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {mode === "register" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="hoTen">Họ Tên</Label>
                <Input
                  id="hoTen"
                  type="text"
                  placeholder="Nhập họ tên"
                  value={formData.hoTen}
                  onChange={(e) => handleInputChange("hoTen", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soDT">Số điện thoại</Label>
                <Input
                  id="soDT"
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={formData.soDT}
                  onChange={(e) => handleInputChange("soDT", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {mode === "login" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
              <NavLink
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </NavLink>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Please wait..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-center">
        <p className="text-sm text-muted-foreground">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <NavLink
            to={mode === "login" ? "/auth/register" : "/auth/login"}
            className="text-primary hover:underline"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </NavLink>
        </p>
      </CardFooter>
    </Card>
  );
}
