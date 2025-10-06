import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courseApi } from "@/services/course.api";
import Swal from "sweetalert2";
import React from "react";
import {
  getUsersNotEnrolled,
  getPendingEnrolledUsers,
  getEnrolledUsers,
} from "@/services/user.api";
import Pagination from "@/components/ui/Pagination";

interface EnrollCourseModalProps {
  courseId: string;
  onClose: () => void;
}

export default function EnrollCourseModal({
  courseId,
  onClose,
}: EnrollCourseModalProps) {
  const [notEnrolled, setNotEnrolled] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [enrolled, setEnrolled] = useState<any[]>([]);

  const [searchNotEnrolled, setSearchNotEnrolled] = useState("");
  const [searchPending, setSearchPending] = useState("");
  const [searchEnrolled, setSearchEnrolled] = useState("");

  const [notEnrolledPage, setNotEnrolledPage] = useState(1);
  const [pendingPage, setPendingPage] = useState(1);
  const [enrolledPage, setEnrolledPage] = useState(1);

  const pageSize = 2;

  const fetchAll = async () => {
    try {
      const [notEnrolledRes, pendingRes, enrolledRes] = await Promise.all([
        getUsersNotEnrolled(courseId),
        getPendingEnrolledUsers(courseId),
        getEnrolledUsers(courseId),
      ]);

      setNotEnrolled(notEnrolledRes.data || []);
      setPending(pendingRes.data || []);
      setEnrolled(enrolledRes.data || []);
    } catch (err) {
      console.error("Error fetching enroll data:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [courseId]);

  const handleEnroll = async (taiKhoan: string) => {
    try {
      await courseApi.enrollCourse({ maKhoaHoc: courseId, taiKhoan });
      Swal.fire("Thành công", "Ghi danh thành công!", "success");
      fetchAll();
    } catch {
      Swal.fire("Lỗi", "Ghi danh thất bại", "error");
    }
  };

  const handleConfirm = async (taiKhoan: string) => {
    try {
      await courseApi.confirmEnroll({ maKhoaHoc: courseId, taiKhoan });
      Swal.fire("Thành công", "Xác thực thành công!", "success");
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (
    taiKhoan: string,
    actionLabel: string = "Huỷ ghi danh"
  ) => {
    try {
      await courseApi.cancelEnroll({ maKhoaHoc: courseId, taiKhoan });
      Swal.fire("Thành công", `${actionLabel} thành công!`, "success");
      fetchAll();
    } catch (err) {
      console.error(err);
      Swal.fire("Lỗi", `${actionLabel} thất bại!`, "error");
    }
  };

  const renderTable = (
    data: any[],
    search: string,
    setSearch: (val: string) => void,
    title: string,
    actions: (user: any) => React.ReactNode,
    page: number,
    setPage: (page: number) => void
  ) => {
    const filtered = data.filter(
      (u) =>
        u.taiKhoan.toLowerCase().includes(search.toLowerCase()) ||
        u.hoTen?.toLowerCase().includes(search.toLowerCase())
    );

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);

    return (
      <div className="my-6">
        <h2 className="font-semibold mb-2">{title}</h2>
        <Input
          placeholder="Nhập tài khoản hoặc họ tên học viên"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="mb-2"
        />
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">STT</th>
              <th className="p-2 border">Tài khoản</th>
              <th className="p-2 border">Học viên</th>
              <th className="p-2 border">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u, i) => (
              <tr key={u.taiKhoan}>
                <td className="p-2 border">{startIndex + i + 1}</td>
                <td className="p-2 border">{u.taiKhoan}</td>
                <td className="p-2 border">{u.hoTen}</td>
                <td className="p-2 border flex gap-2 justify-center">
                  {actions(u)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-16 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <h1 className="text-xl font-bold mb-4">Ghi danh học viên</h1>

        {renderTable(
          notEnrolled,
          searchNotEnrolled,
          setSearchNotEnrolled,
          "Chọn người dùng",
          (u) => (
            <Button
              className="bg-emerald-500"
              onClick={() => handleEnroll(u.taiKhoan)}
            >
              Ghi danh
            </Button>
          ),
          notEnrolledPage,
          setNotEnrolledPage
        )}

        {renderTable(
          pending,
          searchPending,
          setSearchPending,
          "Học viên chờ xác thực",
          (u) => (
            <>
              <Button
                className="bg-emerald-500"
                onClick={() => handleConfirm(u.taiKhoan)}
              >
                Xác thực
              </Button>
              <Button
                className="bg-red-500"
                onClick={() => handleCancel(u.taiKhoan, "Xoá")}
              >
                Xóa
              </Button>
            </>
          ),
          pendingPage,
          setPendingPage
        )}

        {renderTable(
          enrolled,
          searchEnrolled,
          setSearchEnrolled,
          "Học viên đã tham gia khóa học",
          (u) => (
            <Button
              className="bg-red-500"
              onClick={() => handleCancel(u.taiKhoan)}
            >
              Huỷ Ghi Danh
            </Button>
          ),
          enrolledPage,
          setEnrolledPage
        )}

        <div className="flex justify-end mt-4">
          <Button className="bg-gray-400 text-white" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}
