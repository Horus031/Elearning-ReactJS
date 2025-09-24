import { getCourseListPagination } from "@/services/course.api";
import { renderCourseList } from "@/utils/renderCourseUtils";
import { useQuery } from "@tanstack/react-query";
import { MoveRight } from "lucide-react";
import { useState } from "react";

const CourseSection = () => {
  const [pageNumber] = useState(1);
  const { data } = useQuery({
    queryKey: ["course-list", pageNumber],
    queryFn: () => getCourseListPagination(pageNumber),
  });

  const courseList = data?.items ?? [];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-2xl">Các khóa học mới nhất</span>

          <a href="/DanhSachKhoaHoc" className="text-lg flex items-center gap-2 text-gray-500 cursor-pointer">
            Xem thêm <MoveRight color="grey" />{" "}
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderCourseList(courseList)}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
