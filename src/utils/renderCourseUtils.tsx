import type { Course } from "@/types/course";
import { NavLink } from "react-router-dom";

export const renderCourseList = (data: Course[]) => {
    return data.map((course) => {
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