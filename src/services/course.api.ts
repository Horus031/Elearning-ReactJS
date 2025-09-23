import type { Course, CourseCategory, CoursePage } from "@/types/course";
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

export const getCourseCategory = async(): Promise<CourseCategory[] | undefined> => {
    try {
        const response = await api.get<CourseCategory[]>("QuanLyKhoaHoc/LayDanhMucKhoaHoc")

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