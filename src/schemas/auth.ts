import { z } from "zod";

// 🔹 Schema cho login
export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Tài khoản phải có ít nhất 3 ký tự")
    .max(50, "Tài khoản không được quá 50 ký tự"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(100, "Mật khẩu không được quá 100 ký tự"),
});

// 🔹 Schema cho register
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Tài khoản phải có ít nhất 3 ký tự")
      .max(50, "Tài khoản không được quá 50 ký tự"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(100, "Mật khẩu không được quá 100 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự")
      .max(100, "Xác nhận mật khẩu không được quá 100 ký tự"),
    fullName: z
      .string()
      .min(2, "Họ tên phải có ít nhất 2 ký tự")
      .max(100, "Họ tên không được quá 100 ký tự"),
    phone: z
      .string()
      .regex(/^(0|\+84)(\d{9})$/, "Số điện thoại không hợp lệ"),
    email: z
      .string()
      .email("Email không hợp lệ"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // báo lỗi vào field confirmPassword
    message: "Mật khẩu xác nhận không khớp",
  });

// 🔹 Export type để dùng trong code
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
