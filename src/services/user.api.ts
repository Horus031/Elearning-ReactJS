import type { User, UserInfor } from "@/types/user";
import api from "./api";
import type {
  LoginDataRequest,
  RegisterDataRequest,
  UpdateDataRequest,
} from "@/types/auth";
import { https } from "@/services/api";
import type { AxiosResponse } from "axios";
import axios from "axios";

export interface AddUserPayload {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maLoaiNguoiDung: "GV" | "HV";
  maNhom: string;
}

export const loginApi = async (data: LoginDataRequest) => {
  try {
    const response = await api.post<User>("QuanLyNguoiDung/DangNhap", data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const registerApi = async (data: RegisterDataRequest) => {
  try {
    const response = await api.post("QuanLyNguoiDung/DangKy", data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInformation = async (): Promise<UserInfor | undefined> => {
  try {
    const response = await api.post("QuanLyNguoiDung/ThongTinNguoiDung");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInfo = async (data: UpdateDataRequest) => {
  try {
    const response = await api.put(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = () => api.post("/QuanLyNguoiDung/ThongTinNguoiDung");

export const getAccountInfo = (taiKhoan: string) =>
  api.post("/QuanLyNguoiDung/ThongTinTaiKhoan", { taiKhoan });

// ------------------------
// LOẠI NGƯỜI DÙNG, DANH SÁCH
// ------------------------

export const getUserTypes = () =>
  api.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");

export const getUserList = () =>
  api.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");

export const getUserListPaginated = (
  soTrang: number,
  soPhanTuTrenTrang: number
) =>
  api.get("/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang", {
    params: { soTrang, soPhanTuTrenTrang },
  });

export const searchUser = (tuKhoa: string, maNhom = "GP01") =>
  api.get("/QuanLyNguoiDung/TimKiemNguoiDung", {
    params: { tuKhoa, maNhom },
  });

// ------------------------
// ADMIN: THÊM - SỬA - XÓA NGƯỜI DÙNG
// ------------------------

export const updateUser = (data: {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: "HV" | "GV";
  maNhom: string;
  email: string;
}) => api.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);

export const deleteUser = (taiKhoan: string) =>
  api.delete("/QuanLyNguoiDung/XoaNguoiDung", {
    params: { TaiKhoan: taiKhoan },
  });

// ------------------------
// GHI DANH DỰA VÀO NGƯỜI DÙNG
// ------------------------

export const getCoursesNotRegisteredByUser = (taiKhoan: string) =>
  api.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh", {
    taiKhoan,
  });

export const getCoursesPendingByUser = (taiKhoan: string) =>
  api.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", {
    taiKhoan,
  });

export const getCoursesApprovedByUser = (taiKhoan: string) =>
  api.post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", {
    taiKhoan,
  });

// ------------------------
// GHI DANH DỰA VÀO KHÓA HỌC
// ------------------------

export const getUsersNotRegisteredInCourse = (maKhoaHoc: string) =>
  api.post("/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", {
    maKhoaHoc,
  });

export const getUsersPendingInCourse = (maKhoaHoc: string) =>
  api.post("/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", {
    maKhoaHoc,
  });

export const getUsersRegisteredInCourse = (maKhoaHoc: string) =>
  api.post("/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", {
    maKhoaHoc,
  });

export interface AddUserPayload {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: "GV" | "HV";
  maNhom: string;
  email: string;
}

export const addUser = async (data: AddUserPayload) => {
  try {
    const response = await api.post("QuanLyNguoiDung/ThemNguoiDung", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUsers = (groupCode: string) => {
  return https.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${groupCode}`);
};

export const getUsersPaging = (
  page: number,
  pageSize: number = 10,
  keyword: string = ""
) => {
  const params: any = {
    MaNhom: "GP01",
    page: page,
    pageSize: pageSize,
  };

  if (keyword.trim()) {
    params.tuKhoa = keyword.trim();
  }

  return https.get("/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang", {
    params,
  });
};

export const getUsersNotEnrolled = (
  maKhoaHoc: string,
  page: number = 1,
  pageSize: number = 3,
  keyword: string = ""
) => {
  return api.post("/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", {
    maKhoaHoc,
    tuKhoa: keyword,
    page,
    pageSize,
  });
};

export const getPendingEnrolledUsers = (
  maKhoaHoc: string,
  page: number = 1,
  pageSize: number = 3,
  keyword: string = ""
) => {
  return api.post("/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", {
    maKhoaHoc,
    tuKhoa: keyword,
    page,
    pageSize,
  });
};

export const getEnrolledUsers = (
  maKhoaHoc: string,
  keyword: string = ""
): Promise<AxiosResponse<any>> => {
  return api.post("/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", {
    maKhoaHoc,
    tuKhoa: keyword,
  });
};

export const uploadCourseImage = (formData: FormData) => {
  return axios.post(
    "http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh",
    formData
  );
};
