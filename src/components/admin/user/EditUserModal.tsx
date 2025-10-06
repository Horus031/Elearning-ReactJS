import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// Sửa:
import { updateUserThunk } from "../../../store/slices/userSlice";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaBriefcase,
  FaAddressBook,
} from "react-icons/fa";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    matKhau: "",
    nhapLaiMatKhau: "",
    soDT: "",
    maLoaiNguoiDung: "HV",
    maNhom: "GP01",
  });

  // ✅ thêm errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        taiKhoan: user.taiKhoan ?? prev.taiKhoan,
        hoTen: user.hoTen ?? prev.hoTen,
        email: user.email ?? prev.email,
        soDT: user.soDT ?? prev.soDT,
        maLoaiNguoiDung: user.maLoaiNguoiDung ?? prev.maLoaiNguoiDung,
        maNhom: user.maNhom ?? prev.maNhom,
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (form.hoTen.trim().length < 2) {
      newErrors.hoTen = "Họ tên phải có ít nhất 2 ký tự";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Validate mật khẩu
    if (form.matKhau.length < 6) {
      newErrors.matKhau = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Kiểm tra mật khẩu khớp
    if (form.matKhau !== form.nhapLaiMatKhau) {
      newErrors.nhapLaiMatKhau = "Mật khẩu nhập lại không khớp";
    }

    // Validate số điện thoại (9–11 chữ số)
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(form.soDT)) {
      newErrors.soDT = "Số điện thoại không hợp lệ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { nhapLaiMatKhau, ...payload } = form;

    await dispatch(updateUserThunk(payload) as any);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-start pt-48 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">
          THÔNG TIN NGƯỜI DÙNG
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tài khoản */}
          <div>
            <div className="flex items-center border px-3 py-2 rounded">
              <FaUser className="mr-2 text-xl" />
              <input
                type="text"
                name="taiKhoan"
                value={form.taiKhoan}
                readOnly
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Họ tên */}
          <div>
            <div className="flex items-center border px-3 py-2 rounded">
              <FaAddressBook className="mr-2 text-xl" />
              <input
                type="text"
                name="hoTen"
                value={form.hoTen}
                onChange={handleChange}
                placeholder="Họ tên"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
            {errors.hoTen && (
              <p className="text-red-500 text-sm">{errors.hoTen}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center border px-3 py-2 rounded">
              <FaEnvelope className="mr-2 text-xl" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Mật khẩu */}
          <div>
            <div className="flex items-center border px-3 py-2 rounded">
              <FaLock className="mr-2 text-xl" />
              <input
                type="password"
                name="matKhau"
                value={form.matKhau}
                onChange={handleChange}
                placeholder="Mật khẩu"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
            {errors.matKhau && (
              <p className="text-red-500 text-sm">{errors.matKhau}</p>
            )}
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <div className="flex items-center border px-3 py-2 rounded">
              <FaLock className="mr-2 text-xl" />
              <input
                type="password"
                name="nhapLaiMatKhau"
                value={form.nhapLaiMatKhau}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
            {errors.nhapLaiMatKhau && (
              <p className="text-red-500 text-sm">{errors.nhapLaiMatKhau}</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <div className="flex items-center border px-3 py-2 rounded">
              <FaPhone className="mr-2 text-xl" />
              <input
                type="tel"
                name="soDT"
                value={form.soDT}
                onChange={handleChange}
                placeholder="Số điện thoại"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
            {errors.soDT && (
              <p className="text-red-500 text-sm">{errors.soDT}</p>
            )}
          </div>

          {/* Vai trò */}
          <div className="flex items-center border px-3 py-2 rounded">
            <FaBriefcase className="mr-2 text-xl" />
            <select
              name="maLoaiNguoiDung"
              value={form.maLoaiNguoiDung}
              onChange={handleChange}
              className="w-full bg-transparent outline-none"
            >
              <option value="HV">Học viên</option>
              <option value="GV">Giáo vụ</option>
            </select>
          </div>

          {/* Button */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
