import type { User, UserInfor } from "@/types/user";
import api from "./api";
import type { LoginDataRequest, RegisterDataRequest, UpdateDataRequest } from "@/types/auth";



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

export const getInformation = async (): Promise<UserInfor | undefined> => {
    try {
        const response = await api.post("QuanLyNguoiDung/ThongTinNguoiDung")

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateUserInfo = async (data: UpdateDataRequest) => {
    try {
        const response = await api.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}