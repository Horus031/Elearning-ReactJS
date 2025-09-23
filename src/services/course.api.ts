import type { Course, CourseCategories, CoursePage } from "@/types/course";
import api from "./api";


export const getCourseList = async(): Promise<Course[] | undefined> => {
    try {
        const response = await api.get<Course[]>("QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01")

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getCourseListPagination = async(pageNumber: number): Promise<CoursePage | undefined> => {
    const response = await api.get<CoursePage>(`QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${pageNumber}&pageSize=8&MaNhom=GP01`)

    return response.data
}

export const getCourseCategory = async(): Promise<CourseCategories[] | undefined> => {
    try {
        const response = await api.get<CourseCategories[]>("QuanLyKhoaHoc/LayDanhMucKhoaHoc")

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getCourseByCategory = async(maDanhMuc: string): Promise<Course[] | undefined> => {
    try {
        const response = await api.get<Course[]>(`QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`);

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getCourseByKeyword = async(tenKhoaHoc: string): Promise<Course[] | undefined> => {
    try {
        const response = await api.get<Course[]>(`QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP01`)
        
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCourseDetails = async(maKhoaHoc: string): Promise<Course | undefined> => {
    try {
        const response = await api.get<Course>(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
}