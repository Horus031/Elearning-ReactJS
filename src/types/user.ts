export type CreateCourseUser = {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
}

export type User = {
    taiKhoan: string;
    email: string;
    soDT: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    hoTen: string;
    accessToken: string;
}
