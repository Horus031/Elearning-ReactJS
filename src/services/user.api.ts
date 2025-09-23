import type { User } from "@/types/user";
import api from "./api";
import type { LoginDataRequest, RegisterDataRequest } from "@/types/auth";



export const loginApi = async (data: LoginDataRequest) => {
    try {
        const response = await api.post<User>("QuanLyNguoiDung/DangNhap", data);

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const registerApi = async (data: RegisterDataRequest) => {
    try {
        const response = await api.post("QuanLyNguoiDung/DangKy", data)

        return response.data;
    } catch (error) {
        console.log(error)
    }
}