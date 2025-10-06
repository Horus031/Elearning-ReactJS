import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { courseApi } from "@/services/course.api";
import Swal from "sweetalert2";

interface Course {
  maKhoaHoc: string;
  tenKhoaHoc: string;
}

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: string;
}

const EnrollModal = ({ isOpen, onClose, user }: EnrollModalProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  // ✅ Khi mở modal, lấy danh sách tất cả khóa học + khóa học đã ghi danh
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCoursesRes = await courseApi.getAllCourses();
        const enrolledRes = await courseApi.getEnrolledCourses(user);
        setCourses(allCoursesRes.data);
        setFilteredCourses(allCoursesRes.data);
        setEnrolledCourses(enrolledRes.data || []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách khóa học", error);
      }
    };

    if (isOpen) fetchCourses();
  }, [isOpen, user]);

  // ✅ Search khóa học theo tên
  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = courses.filter((c) =>
        c.tenKhoaHoc.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchTerm, courses]);

  // ✅ Ghi danh ngay và cập nhật danh sách đã ghi danh
  const handleEnroll = async () => {
    if (!selectedCourse) return;

    try {
      await courseApi.confirmEnroll({
        maKhoaHoc: selectedCourse.maKhoaHoc,
        taiKhoan: user,
      });

      // ✅ Hiện thông báo ghi danh thành công
      Swal.fire({
        icon: "success",
        title: "Ghi danh thành công!",
        showConfirmButton: false,
        timer: 1500,
      });

      // ✅ Gọi lại danh sách đã ghi danh từ backend
      const enrolledRes = await courseApi.getEnrolledCourses(user);
      setEnrolledCourses(enrolledRes.data || []);

      // ✅ Reset form
      setSearchTerm("");
      setSelectedCourse(null);
      setShowDropdown(false);
    } catch (err) {
      console.error("Ghi danh thất bại", err);

      // ✅ Hiện thông báo thất bại
      Swal.fire({
        icon: "error",
        title: "Ghi danh thất bại!",
      });
    }
  };

  const handleUnenroll = async (maKhoaHoc: string) => {
    try {
      await courseApi.cancelEnroll({ maKhoaHoc, taiKhoan: user });

      Swal.fire({
        icon: "success",
        title: "Đã huỷ ghi danh!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Gọi lại danh sách khóa học đã ghi danh
      const res = await courseApi.getEnrolledCourses(user);
      setEnrolledCourses(res.data || []);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Huỷ ghi danh thất bại!",
      });
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-start pt-48 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          Ghi danh cho Học viên "{user}"
        </h2>

        {/* Tìm & chọn khóa học */}
        <div className="mb-4">
          <label className="font-semibold">Chọn khóa học</label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm khóa học..."
              className="w-full border px-3 py-2 rounded mt-1"
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            />
            {showDropdown && (
              <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-white border rounded shadow">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <div
                      key={course.maKhoaHoc}
                      onClick={() => {
                        setSelectedCourse(course);
                        setSearchTerm(course.tenKhoaHoc);
                        setShowDropdown(false);
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {course.tenKhoaHoc}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500">Không tìm thấy</div>
                )}
              </div>
            )}
          </div>
          <Button
            onClick={handleEnroll}
            className="mt-2 bg-emerald-500 text-white"
          >
            Ghi danh
          </Button>
        </div>

        {/* ✅ Khóa học đã ghi danh */}
        <h3 className="font-semibold mb-2">Khóa học đã ghi danh</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">STT</th>
              <th className="p-2 border">Tên khóa học</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((c, i) => (
              <tr key={c.maKhoaHoc}>
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{c.tenKhoaHoc}</td>
                <td className="p-2 border">
                  <Button
                    onClick={() => handleUnenroll(c.maKhoaHoc)}
                    className="bg-red-500 text-white"
                  >
                    Xoá
                  </Button>
                </td>
              </tr>
            ))}
            {enrolledCourses.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 p-4">
                  Chưa ghi danh khóa học nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Đóng modal */}
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} className="bg-gray-400 text-white">
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnrollModal;
