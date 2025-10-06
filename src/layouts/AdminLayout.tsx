// src/layouts/AdminLayout.tsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import EditUserModal from "@/components/admin/user/EditUserModal";
import type { User } from "@/types/user";

const AdminLayout = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [userAccount, setUserAccount] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  // ✅ Lấy user hiện tại
  const userJson = localStorage.getItem("user");
  const currentUser = userJson ? JSON.parse(userJson) : null;

  // ✅ Nếu không phải GV → redirect về login
  useEffect(() => {
    if (!currentUser || currentUser.maLoaiNguoiDung !== "GV") {
      navigate("/auth/login");
    }
  }, []);

  // ✅ Không render nếu không có quyền (tránh nháy UI)
  if (!currentUser || currentUser.maLoaiNguoiDung !== "GV") {
    return null;
  }

  useEffect(() => {
    if (currentUser) {
      setUserAccount(currentUser.taiKhoan || "Người dùng");
    }
  }, [currentUser]);

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-green-700 text-white p-4">
        <NavLink to="/" className="flex items-center space-x-2 mb-8 ">
          <img src="/images/logo.png" className="h-8 w-8" />
          <span className="text-3xl font-bold text-white hidden lg:block">
            Cybersoft
          </span>
        </NavLink>
        <nav className="space-y-2">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-green-600 ${
                isActive ? "bg-green-800" : ""
              }`
            }
          >
            Quản lý người dùng
          </NavLink>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-green-600 ${
                isActive ? "bg-green-800" : ""
              }`
            }
          >
            Quản lý khóa học
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-end mb-4 relative" ref={dropdownRef}>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="inline-flex items-center space-x-2 hover:opacity-80"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">Chào {userAccount},</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                <button
                  onClick={() => {
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                      const parsed = JSON.parse(storedUser);
                      setUserInfo(parsed);
                      setIsEditModalOpen(true);
                    }
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Cập nhật thông tin
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/auth/login");
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>

        {isEditModalOpen && userInfo && (
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={userInfo}
          />
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
