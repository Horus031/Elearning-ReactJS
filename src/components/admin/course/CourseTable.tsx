import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoursesPagingThunk,
  deleteCourseThunk,
  setPage,
} from "@/store/slices/courseSlice";
import type { RootState, AppDispatch } from "@/store/store";
import type { Course } from "@/types/course";
import Pagination from "@/components/ui/Pagination";
import EnrollCourseModal from "./EnrollCourseModal";
import EditCourseModal from "./EditCourseModal";
import AddCourseModal from "./AddCourseModal";

const CourseTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Đưa useState vào trong component
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const {
    items: courses,
    page,
    totalPages,
    totalItems,
  } = useSelector((state: RootState) => state.courses);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        fetchCoursesPagingThunk({
          page,
          pageSize: 5,
          keyword: searchKeyword,
        }) as any
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [page, searchKeyword, dispatch]);
  const handleDelete = (maKhoaHoc: string) => {
    if (confirm("Bạn có chắc muốn xóa khoá học này?")) {
      dispatch(deleteCourseThunk(maKhoaHoc));
    }
  };

  const filteredCourses = courses.filter((course) =>
    normalize(course.tenKhoaHoc || "").includes(normalize(searchKeyword))
  );
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Header: Thêm khóa học + tìm kiếm */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow"
        >
          Thêm khóa học
        </button>

        <input
          type="text"
          placeholder="Nhập tên hoặc mã khóa học"
          className="absolute left-1/2 transform -translate-x-1/2 border border-gray-300 px-4 py-2 rounded-md w-[800px]"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">STT</th>
              <th className="border p-2">Mã khóa học</th>
              <th className="border p-2">Tên khóa học</th>
              <th className="border p-2">Hình ảnh</th>
              <th className="border p-2">Lượt xem</th>
              <th className="border p-2">Người tạo</th>
              <th className="border p-2" colSpan={3}>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course: Course, index: number) => (
                <tr key={course.maKhoaHoc}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">{course.maKhoaHoc}</td>
                  <td className="border p-2">{course.tenKhoaHoc}</td>
                  <td className="border p-2 text-center">
                    <div className="p-1 text-center align-middle">
                      <div className="w-[100px] h-[60px] mx-auto overflow-hidden rounded-md">
                        <img
                          src={
                            course.hinhAnh?.startsWith("http")
                              ? course.hinhAnh
                              : `https://elearningnew.cybersoft.edu.vn/hinhanh/${course.hinhAnh}`
                          }
                          alt={course.tenKhoaHoc}
                          className="h-12 w-20 object-cover mx-auto rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/120x60?text=No+Image";
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border p-2 text-center">{course.luotXem}</td>
                  <td className="border p-2 text-center">
                    {course.nguoiTao?.hoTen}
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedCourseId(course.maKhoaHoc)}
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
                      >
                        Ghi danh
                      </button>
                      <button
                        onClick={() => setEditCourse(course)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-lg"
                      >
                        Cập nhật
                      </button>
                      <button
                        onClick={() => handleDelete(course.maKhoaHoc)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center text-gray-500 py-4">
                  Không tìm thấy khóa học nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isAddModalOpen && (
        <AddCourseModal onClose={() => setIsAddModalOpen(false)} />
      )}
      {selectedCourseId && (
        <EnrollCourseModal
          courseId={selectedCourseId}
          onClose={() => setSelectedCourseId(null)}
        />
      )}
      {editCourse && (
        <EditCourseModal
          course={editCourse}
          onClose={() => setEditCourse(null)}
        />
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        pageSize={5}
        totalItems={totalItems}
        onPageChange={(newPage) => dispatch(setPage(newPage))}
      />
    </div>
  );
};

export default CourseTable;
