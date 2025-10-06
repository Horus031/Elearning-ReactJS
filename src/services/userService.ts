import api from "./api";

// 1. Lấy danh sách loại người dùng
export const getUserTypes = async () => {
  const response = await api.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  return response.data;
};

// 2. Lấy toàn bộ danh sách người dùng (không phân trang)
export const getUsers = async () => {
  const response = await api.get("/QuanLyNguoiDung/LayDanhSachNguoiDung", {
    params: { MaNhom: "GP01" },
  });
  return response.data;
};

// 3. Lấy danh sách người dùng có phân trang
export const getUsersPaging = async (
  page: number,
  pageSize: number,
  keyword: string = ""
) => {
  const response = await api.get(
    "/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang",
    {
      params: {
        MaNhom: "GP01",
        tuKhoa: keyword,
        soTrang: page,
        soPhanTuTrenTrang: pageSize,
      },
    }
  );
  return response.data;
};

// 4. Tìm kiếm người dùng theo từ khóa
export const searchUsers = async (keyword: string) => {
  const response = await api.get("/QuanLyNguoiDung/TimKiemNguoiDung", {
    params: {
      MaNhom: "GP01",
      tuKhoa: keyword,
    },
  });
  return response.data.map((u: any) => ({
    ...u,
    soDT: u.soDT || u.soDt || "",
  }));
};
// 5. Thêm người dùng mới
export const addUser = async (userData: any) => {
  const response = await api.post("/QuanLyNguoiDung/ThemNguoiDung", userData);
  return response.data;
};

// 6. Cập nhật người dùng (sửa thông tin người dùng)
export const updateUser = async (userData: any) => {
  const response = await api.put(
    "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    userData
  );
  return response.data;
};

// 7. Xóa người dùng
export const deleteUser = async (taiKhoan: string) => {
  const response = await api.delete("/QuanLyNguoiDung/XoaNguoiDung", {
    params: {
      TaiKhoan: taiKhoan,
    },
  });
  return response.data;
};
