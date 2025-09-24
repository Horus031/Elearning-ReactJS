import CourseList from "@/components/CourseCategoryPage/CourseList";
import { useQueryParams } from "@/hooks/useQueryParams";

const CourseCategoryPage = () => {
  const queryParams = useQueryParams();
  const maDanhMuc = queryParams.get("maDanhMuc") ?? "";

  return (
    <div className="py-20 space-y-4">
      <div className="bg-gradient-to-r from-orange-500 from- via-amber-500 via- to-yellow-500 to-">
        <div className="container mx-auto h-44 flex items-center text-white">
          <h2 className="text-4xl font-normal uppercase">
            Khóa học {maDanhMuc}
          </h2>
        </div>
      </div>
      <CourseList maDanhMuc={maDanhMuc} />
    </div>
  );
};

export default CourseCategoryPage;
