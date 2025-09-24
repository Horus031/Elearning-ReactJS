import { getCourseByKeyword } from "@/services/course.api";
import { renderCourseList } from "@/utils/renderCourseUtils";
import { useQuery } from "@tanstack/react-query";

type CourseSearch = {
  tenKhoaHoc: string;
};

const CourseSearch = (props: CourseSearch) => {
  const { tenKhoaHoc } = props;

  const { data = [], isSuccess } = useQuery({
    queryKey: ["course-search", tenKhoaHoc],
    queryFn: () => getCourseByKeyword(tenKhoaHoc),
  });

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-orange-500 from- via-amber-500 via- to-yellow-500 to-">
        <div className="container mx-auto h-44 flex items-center text-white">
          <h2 className="text-4xl font-normal uppercase">
            Tìm thấy {data.length || 0} khóa học cho từ khóa {tenKhoaHoc}
          </h2>
        </div>
      </div>

      <div className="container mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isSuccess ? renderCourseList(data) : ""}
        </div>
      </div>
    </div>
  );
};

export default CourseSearch;
