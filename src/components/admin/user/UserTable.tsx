import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { User } from "@/types/user";
import type { RootState } from "@/store/store";
import { fetchUsersPaging, setPage } from "@/store/slices/userSlice";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/Pagination";
import EnrollModal from "./EnrollModal";
import EditUserModal from "./EditUserModal";
import { searchUsersThunk, deleteUserThunk } from "@/store/slices/userSlice";
import AddUserForm from "./AddUserForm";

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, page, totalPages } = useSelector(
    (state: RootState) => state.users
  );

  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  useEffect(() => {
    if (userToEdit) {
      const updated = users.find((u) => u.taiKhoan === userToEdit.taiKhoan);
      if (updated) {
        setUserToEdit(updated);
      }
    }
  }, [users]);

  useEffect(() => {
    if (userToEdit) {
      const updated = users.find((u) => u.taiKhoan === userToEdit.taiKhoan);
      if (updated) {
        setUserToEdit(updated);
      }
    }
  }, [users]);

  useEffect(() => {
    console.log("Redux page hiện tại:", page);
    dispatch(fetchUsersPaging({ page, pageSize, keyword: searchTerm }) as any);
  }, [page, searchTerm, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim()) {
        dispatch(searchUsersThunk(searchTerm) as any);
      } else {
        dispatch(fetchUsersPaging({ page, pageSize, keyword: "" }) as any);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, searchTerm, dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await dispatch(deleteUserThunk(userToDelete.taiKhoan) as any).unwrap();
      setShowConfirmDelete(false);
      setUserToDelete(null);
    } catch (error: any) {
      // Lấy message từ lỗi API (giải mã Unicode nếu bị mã hoá)
      const message = error?.message || "Xảy ra lỗi khi xoá người dùng!";
      setDeleteError(message);
      setShowConfirmDelete(false);
    }
  };

  useEffect(() => {
    if (userToEdit) {
      const updated = users.find((u) => u.taiKhoan === userToEdit.taiKhoan);
      if (updated) {
        setUserToEdit(updated);
      }
    }
  }, [users]);

  return (
    <div className="p-6">
      <div className="flex items-center mb-4 relative">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md"
        >
          Thêm người dùng
        </Button>

        <input
          type="text"
          placeholder="Nhập tài khoản hoặc họ tên"
          className="absolute left-1/2 transform -translate-x-1/2 border border-gray-300 px-4 py-2 rounded-md w-[800px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto max-w-full">
        <table className="min-w-[800px] w-full text-xs sm:text-sm md:text-base text-left">
          <thead className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-2">STT</th>
              <th className="px-4 py-2">Tài khoản</th>
              <th className="px-4 py-2">Người dùng</th>
              <th className="px-4 py-2">Họ và tên</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Số điện thoại</th>
              <th className="px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User, index: number) => (
              <tr key={user.taiKhoan} className="even:bg-gray-50">
                <td className="px-4 py-2">
                  {(page - 1) * pageSize + index + 1}
                </td>
                <td className="px-4 py-2">{user.taiKhoan}</td>
                <td className="px-4 py-2">{user.maLoaiNguoiDung}</td>
                <td className="px-4 py-2">{user.hoTen}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.soDT}</td>
                <td className="px-4 py-2 space-x-2 text-center">
                  <Button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1"
                    onClick={() => {
                      setSelectedUser(user.taiKhoan);
                      setIsModalOpen(true);
                    }}
                  >
                    Ghi danh
                  </Button>

                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1"
                    onClick={() => {
                      setUserToEdit(user);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1"
                    onClick={() => {
                      setUserToDelete(user);
                      setShowConfirmDelete(true);
                    }}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showConfirmDelete && userToDelete && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-start pt-48 z-50">
            <div className="bg-white p-6 rounded-lg w-80 shadow-md">
              <h2 className="text-lg font-semibold text-center mb-4">
                Xác nhận xoá người dùng?
              </h2>
              <p className="text-center text-sm text-gray-700 mb-6">
                Tài khoản: <strong>{userToDelete.taiKhoan}</strong>
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Xoá
                </button>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Huỷ
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteError && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-start pt-48 z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-md text-center">
              <div className="text-orange-400 text-5xl mb-4">!</div>
              <h2 className="text-lg font-semibold text-green-600 mb-2">
                Người dùng đã được ghi danh không thể xoá!
              </h2>

              <button
                onClick={() => setDeleteError(null)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {isModalOpen && selectedUser && (
          <EnrollModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={selectedUser}
          />
        )}
        {isEditModalOpen && userToEdit && (
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            user={userToEdit}
          />
        )}
        {isAddModalOpen && (
          <AddUserForm onClose={() => setIsAddModalOpen(false)} />
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={users.length * totalPages} // hoặc totalCount từ API nếu có
        onPageChange={(newPage) => dispatch(setPage(newPage))}
      />
    </div>
  );
};

export default UserTable;
