import type {
  Course,
  CourseCategories,
  CoursePage,
  EnrollmentDataRequest,
} from "@/types/course";
import api from "./api";
import { https } from "./config";
import type { AxiosResponse } from "axios";

export const getCoursesPaging = (
  page: number,
  pageSize: number,
  keyword?: string
) => {
  return https
    .get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang", {
      params: {
        tuKhoa: keyword || "",
        page: page,
        pageSize: pageSize,
        maNhom: "GP01", // có thể lấy từ config .env nếu muốn
      },
    })
    .then((res) => res.data);
};

// ✅ Xoá khóa học
export const deleteCourse = (maKhoaHoc: string) => {
  return https.delete("/QuanLyKhoaHoc/XoaKhoaHoc", {
    params: { maKhoaHoc },
  });
};

export const getCourseList = async (): Promise<Course[] | undefined> => {
  try {
    const response = await api.get<Course[]>(
      "QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseListPagination = async (
  pageNumber: number
): Promise<CoursePage | undefined> => {
  const response = await api.get<CoursePage>(
    `QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${pageNumber}&pageSize=8&MaNhom=GP01`
  );

  return response.data;
};

export const getCourseCategory = async (): Promise<
  CourseCategories[] | undefined
> => {
  try {
    const response = await api.get<CourseCategories[]>(
      "QuanLyKhoaHoc/LayDanhMucKhoaHoc"
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseByCategory = async (
  maDanhMuc: string
): Promise<Course[] | undefined> => {
  try {
    const response = await api.get<Course[]>(
      `QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseByKeyword = async (
  tenKhoaHoc: string
): Promise<Course[] | undefined> => {
  try {
    const response = await api.get<Course[]>(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP01`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseDetails = async (
  maKhoaHoc: string | undefined
): Promise<Course | undefined> => {
  try {
    const response = await api.get<Course>(
      `QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const enrollCourse = async (data: EnrollmentDataRequest) => {
  try {
    const response = await api.post("QuanLyKhoaHoc/DangKyKhoaHoc", data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelEnrolledCourse = async (data: EnrollmentDataRequest) => {
  try {
    const response = await api.post("QuanLyKhoaHoc/HuyGhiDanh", data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const layDanhSachKhoaHoc = () => {
  return https.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
};

export const layDanhSachKhoaHocPhanTrang = (page: number, pageSize: number) => {
  return https.get(
    `/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
  );
};

export const courseApi = {
  getAllCourses: () => https.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc"),

  enrollCourse: (data: { maKhoaHoc: string; taiKhoan: string }) =>
    api.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data),

  cancelEnroll: (data: { maKhoaHoc: string; taiKhoan: string }) =>
    api.post("/QuanLyKhoaHoc/HuyGhiDanh", data),

  // Thêm nếu muốn hỗ trợ lọc khóa học theo tên ở frontend
  searchCoursesLocal: (courses: any[], keyword: string) =>
    courses.filter((c) =>
      c.tenKhoaHoc.toLowerCase().includes(keyword.toLowerCase())
    ),
  confirmEnroll: (data: { maKhoaHoc: string; taiKhoan: string }) =>
    api.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data),
  // ✅ Lấy danh sách khóa học đã ghi danh của user
  getEnrolledCourses: (taiKhoan: string): Promise<AxiosResponse<any>> => {
    return api.post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", {
      taiKhoan,
    });
  },
  getNotEnrolledCourses: (taiKhoan: string): Promise<AxiosResponse<any>> => {
    return api.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh", {
      taiKhoan,
    });
  },
  getPendingCourses: (taiKhoan: string): Promise<AxiosResponse<any>> => {
    return api.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", {
      taiKhoan,
    });
  },
  getApprovedCourses: (taiKhoan: string): Promise<AxiosResponse<any>> => {
    return api.post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", {
      taiKhoan,
    });
  },
  getCourseParticipants: (taiKhoan: string): Promise<AxiosResponse<any>> => {
    return api.post("/QuanLyNguoiDung/LayThongTinHocVienKhoaHoc", {
      taiKhoan,
    });
  },
};

export const updateCourse = (data: any) => {
  return api.put("/QuanLyKhoaHoc/CapNhatKhoaHoc", data);
};

export const getCourseCategories = () => {
  return api.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
};

export const addCourse = (data: any) => {
  return api.post("/QuanLyKhoaHoc/ThemKhoaHoc", data);
};
