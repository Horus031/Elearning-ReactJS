export type LoginDataRequest = {
    taiKhoan: string;
    matKhau: string;
}

export type RegisterDataRequest = {
    taiKhoan: string;
    matKhau: string;
    hoTen: string;
    soDT: string;
    maNhom: string;
    email: string;
}

export type AuthFormProps = {
    mode: "login" | "register";
    onSubmit: (data: LoginDataRequest | RegisterDataRequest) => void;
    isLoading?: boolean;
}