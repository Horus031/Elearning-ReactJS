import CourseSearch from "@/components/SearchPage/CourseSearch";
import { useQueryParams } from "@/hooks/useQueryParams"

const SearchPage = () => {
    const queryParams = useQueryParams();
    const tenKhoaHoc = queryParams.get("tenKhoaHoc") ?? "";

  return (
    <div className="py-20">
      <CourseSearch tenKhoaHoc={tenKhoaHoc} />
    </div>
  )
}

export default SearchPage
