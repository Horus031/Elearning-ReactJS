import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoursesPagingThunk,
  deleteCourseThunk,
  setPage,
} from "@/store/slices/courseSlice";
import type { RootState, AppDispatch } from "@/store/store";
import type { Course } from "@/types/course";
import { courseApi } from "@/services/course.api";
import Pagination from "@/components/ui/Pagination";
import EnrollCourseModal from "./EnrollCourseModal";
import EditCourseModal from "./EditCourseModal";
import AddCourseModal from "./AddCourseModal";

const CourseTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [allCoursesWhenSearching, setAllCoursesWhenSearching] = useState<
    Course[]
  >([]);

  const {
    items: courses,
    page,

    totalItems,
  } = useSelector((state: RootState) => state.courses);

  const pageSize = 5;

  // ✅ Gọi API khi có searchKeyword
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (searchKeyword.trim()) {
        try {
          const res = await courseApi.getAllCourses(); // gọi LayDanhSachKhoaHoc
          setAllCoursesWhenSearching(res.data);
          dispatch(setPage(1)); // reset về trang 1
        } catch (err) {
          console.error("Lỗi khi gọi API getCourses", err);
        }
      } else {
        dispatch(
          fetchCoursesPagingThunk({ page, pageSize, keyword: "" }) as any
        );
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchKeyword]);

  // ✅ Gọi lại khi đổi page (nếu không đang search)
  useEffect(() => {
    if (!searchKeyword.trim()) {
      dispatch(fetchCoursesPagingThunk({ page, pageSize, keyword: "" }) as any);
    }
  }, [page]);

  const handleDelete = (maKhoaHoc: string) => {
    if (confirm("Bạn có chắc muốn xóa khoá học này?")) {
      dispatch(deleteCourseThunk(maKhoaHoc));
    }
  };

  // ✅ Tính danh sách hiện tại khi đang search
  const normalizedKeyword = searchKeyword.toLowerCase();
  const filteredCourses = allCoursesWhenSearching.filter((course) =>
    course.tenKhoaHoc.toLowerCase().includes(normalizedKeyword)
  );
  const totalFilteredItems = filteredCourses.length;
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const displayCourses = searchKeyword.trim() ? paginatedCourses : courses;
  const displayTotalItems = searchKeyword.trim()
    ? totalFilteredItems
    : totalItems;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow"
        >
          Thêm khóa học
        </button>

        <input
          type="text"
          placeholder="Nhập tên khóa học"
          className="absolute left-1/2 transform -translate-x-1/2 border border-gray-300 px-4 py-2 rounded-md w-[800px]"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

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
            {displayCourses.length > 0 ? (
              displayCourses.map((course: Course, index: number) => (
                <tr key={course.maKhoaHoc}>
                  <td className="border p-2 text-center">
                    {(page - 1) * pageSize + index + 1}
                  </td>
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
        totalPages={Math.ceil(displayTotalItems / pageSize)}
        pageSize={pageSize}
        totalItems={displayTotalItems}
        onPageChange={(newPage) => dispatch(setPage(newPage))}
      />
    </div>
  );
};

export default CourseTable;
