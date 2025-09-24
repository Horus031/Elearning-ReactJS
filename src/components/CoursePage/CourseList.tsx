import { getCourseListPagination } from "@/services/course.api";
import { renderCourseList } from "@/utils/renderCourseUtils";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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
          {renderCourseList(courseList)}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
