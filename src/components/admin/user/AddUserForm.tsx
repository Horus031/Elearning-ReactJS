import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserThunk } from "@/store/slices/userSlice";
import type { AddUserPayload } from "@/services/user.api";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaIdCard,
} from "react-icons/fa";

type AddUserFormProps = {
  onClose: () => void;
};

const AddUserForm = ({ onClose }: AddUserFormProps) => {
  const dispatch = useDispatch<any>();

  type ExtendedUserPayload = Omit<AddUserPayload, "maLoaiNguoiDung"> & {
    maLoaiNguoiDung: "GV" | "HV" | "";
  };

  const [formData, setFormData] = useState<ExtendedUserPayload>({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // clear error khi user thay đổi
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.taiKhoan.trim())
      newErrors.taiKhoan = "Vui lòng nhập tài khoản";
    if (formData.hoTen.trim().length < 2)
      newErrors.hoTen = "Họ tên phải có ít nhất 2 ký tự";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "Email không hợp lệ";

    if (formData.matKhau.length < 6)
      newErrors.matKhau = "Mật khẩu phải có ít nhất 6 ký tự";

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(formData.soDT))
      newErrors.soDT = "Số điện thoại không hợp lệ";

    if (!formData.maLoaiNguoiDung)
      newErrors.maLoaiNguoiDung = "Vui lòng chọn loại người dùng";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(addUserThunk(formData)).unwrap();
      onClose();
    } catch {
      setErrors({
        taiKhoan: "Tài khoản đã tồn tại hoặc lỗi khi thêm người dùng.",
      });
    }
  };

  const renderInput = (
    name: keyof AddUserPayload,
    placeholder: string,
    icon: React.ReactNode,
    type = "text"
  ) => (
    <div className="w-full">
      <div className="flex items-center border rounded px-3 py-2 w-full">
        <span className="text-gray-400 mr-2">{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className="w-full outline-none"
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">THÊM NGƯỜI DÙNG</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {renderInput("taiKhoan", "Tài khoản", <FaUser />)}
          {renderInput("hoTen", "Họ và tên", <FaIdCard />)}
          {renderInput("email", "Email", <FaEnvelope />, "email")}
          {renderInput("matKhau", "Mật khẩu", <FaLock />, "password")}
          {renderInput("soDT", "Số điện thoại", <FaPhone />)}

          <div className="w-full">
            <div className="flex items-center border rounded px-3 py-2 w-full">
              <span className="text-gray-400 mr-2">
                <FaUserTag />
              </span>
              <select
                name="maLoaiNguoiDung"
                value={formData.maLoaiNguoiDung}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              >
                <option value="">Chọn loại người dùng</option>
                <option value="HV">Học viên</option>
                <option value="GV">Giáo vụ</option>
              </select>
            </div>
            {errors.maLoaiNguoiDung && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maLoaiNguoiDung}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              Thêm người dùng
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
            >
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
