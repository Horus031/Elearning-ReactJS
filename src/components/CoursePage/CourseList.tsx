import { getCourseListPagination } from "@/services/course.api";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const CourseList = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data } = useQuery({
    queryKey: ["course-list", pageNumber],
    queryFn: () => getCourseListPagination(pageNumber),
  });

  const courseList = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleNextPage = (prev: number) => {
    if (pageNumber === totalPages) {
        setPageNumber(1)
    } else {
        setPageNumber(prev + 1)
    }
  }

  const handlePrevPage = (prev: number) => {
    if (pageNumber === 1) {
        setPageNumber(totalPages)
    } else {
        setPageNumber(prev - 1)
    }
  }

  const renderListPagination = () => {
    return courseList.map((course) => {
      return (
        <NavLink
          to=""
          key={course.maKhoaHoc}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div>
            <img
              className="rounded-t-lg w-full h-56"
              src={course.hinhAnh}
              alt={course.biDanh}
            />
          </div>
          <div className="p-5">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {course.tenKhoaHoc}
              </h5>
            </div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
              {course.moTa}
            </p>
            <div className="inline-flex w-full items-center justify-center px-3 py-2 text-base font-medium text-center text-white bg-black rounded-lg hover:bg-black/60 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Xem chi tiết
            </div>
          </div>
        </NavLink>
      );
    });
  };

  return (
    <div>
      <div className="container mx-auto h-44 flex items-center justify-between">
        <h2 className="text-4xl font-normal uppercase">
          Danh sách khóa học của Cybersoft
        </h2>

        <div className="flex gap-4">
            <button onClick={() => handlePrevPage(pageNumber)} className="p-1 rounded-md border border-black cursor-pointer active:scale-90"><ChevronLeft size={32}/></button>
            <button onClick={() => handleNextPage(pageNumber)} className="p-1 rounded-md border border-black cursor-pointer active:scale-90"><ChevronRight size={32}/></button>
        </div>
      </div>
      <div className="container mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderListPagination()}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
