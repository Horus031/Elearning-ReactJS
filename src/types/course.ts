import type { CreateCourseUser } from "./user";

export type CourseCategories = {
    maDanhMuc: string;
    tenDanhMuc: string;
}

export type CourseCategory = {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
}


export type Course = {
    maKhoaHoc: string;
    biDanh: string;
    tenKhoaHoc: string;
    moTa: string;
    luotXem: number;
    hinhAnh: string;
    maNhom: string;
    ngayTao: string;
    soLuongHocVien: number;
    nguoiTao: CreateCourseUser,
    danhMucKhoaHoc: CourseCategory;
}

export type CoursePage = {
    currentPage: number;
    count: number;
    totalPages: number;
    totalCount: number;
    items: Course[]
}
