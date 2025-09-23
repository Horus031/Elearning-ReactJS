import { getCourseByCategory } from "@/services/course.api";
import { renderCourseList } from "@/utils/renderCourseUtils";
import { useQuery } from "@tanstack/react-query";

type CourseListProps = {
  maDanhMuc: string;
};

const CourseList = (props: CourseListProps) => {
  const { maDanhMuc } = props;

  const { data = [] } = useQuery({
    queryKey: ["course-list", maDanhMuc],
    queryFn: () => getCourseByCategory(maDanhMuc),
  });


  return (
    <div >
      <div className="container mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderCourseList(data)}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
