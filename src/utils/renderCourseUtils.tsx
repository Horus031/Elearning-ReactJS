import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types/course";
import { Eye, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export const renderCourseList = (data: Course[]) => {
  // Generate random prices for each course
  const getRandomPrice = () =>
    Math.floor(Math.random() * 10_000_000) + 1_000_000;
  const getRandomDiscount = () => {
    const percent = Math.floor(Math.random() * 41) + 10;
    return percent;
  };

  // Generate random prices and promotion for each course
  const coursePrices = data.reduce((acc, course) => {
    const originalPrice = getRandomPrice();
    const discountPercent = getRandomDiscount();
    const promotionPrice = Math.floor(
      originalPrice * (1 - discountPercent / 100)
    );
    acc[course.maKhoaHoc] = { originalPrice, promotionPrice, discountPercent };
    return acc;
  }, {} as Record<string, { originalPrice: number; promotionPrice: number; discountPercent: number }>);

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
          <div className="mb-2">
            <Badge variant="outline">
              {course.danhMucKhoaHoc.tenDanhMucKhoaHoc || "Test"}
            </Badge>
          </div>
          <div>
            <h5 className="mb-2 h-16 text-2xl font-bold line-clamp-2 tracking-tight text-gray-900 dark:text-white">
              {course.tenKhoaHoc}
            </h5>
          </div>
          <p className="mb-3 h-12 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
            {course.moTa}
          </p>

          <div className="text-gray-500 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye color="gray" /> {course.luotXem}
            </span>
            <span className="flex items-center gap-2">
              <Users color="gray" />
              {course.luotXem}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-2xl">
                {coursePrices[course.maKhoaHoc].promotionPrice.toLocaleString(
                  "vi-VN"
                )}
                ₫
              </span>
              <span className="font-normal line-through text-gray-500">
                {coursePrices[course.maKhoaHoc].originalPrice.toLocaleString(
                  "vi-VN"
                )}
                ₫
              </span>
              <span className="ml-2 text-green-600 text-sm font-semibold">
                -{coursePrices[course.maKhoaHoc].discountPercent}%
              </span>
            </div>
          </div>

          <div className="inline-flex w-full items-center justify-center px-3 py-2 text-base font-medium text-center text-white bg-black rounded-lg hover:bg-black/60 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Xem chi tiết
          </div>
        </div>
      </NavLink>
    );
  });
};
