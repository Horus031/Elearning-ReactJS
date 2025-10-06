// src/pages/AdminTemplate/UserManagement.tsx
import UserTable from "@/components/admin/user/UserTable";

export default function UserManagement() {
  return (
    <div className="bg-white rounded shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Quản lý người dùng
      </h1>
      <UserTable />
    </div>
  );
}
