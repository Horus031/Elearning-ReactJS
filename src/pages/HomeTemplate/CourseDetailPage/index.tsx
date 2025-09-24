import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCourseDetails } from "@/services/course.api";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Clock, Eye, Globe, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NavLink, useParams } from "react-router-dom";
import { CourseEnrollmentCard } from "@/components/CourseDetailPage/CourseEnrollmentCard";
import {
  generateCoursePrice,
  getRandomDuration,
  getRandomStudent,
} from "@/utils/generateCoursePrice";

const CourseDetailPage = () => {
  const { maKhoaHoc } = useParams<{ maKhoaHoc: string }>();

  const randomDuration = getRandomDuration();
  const randomStudents = getRandomStudent();

  const coursePrice = generateCoursePrice();

  const { data } = useQuery({
    queryKey: ["course-details"],
    queryFn: () => getCourseDetails(maKhoaHoc),
  });

  return (
    <div className="py-20">
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <NavLink
              to="/DanhSachKhoaHoc"
              className="hover:text-primary flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Courses
            </NavLink>
            <span>/</span>
            <span>{data?.danhMucKhoaHoc.tenDanhMucKhoaHoc}</span>
          </div>
        </div>
      </div>

      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {data?.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                  </Badge>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-balance">
                  {data?.tenKhoaHoc}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {coursePrice.views.toLocaleString("vi-VN")} Lượt xem
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {coursePrice.students.toLocaleString("vi-VN")} Học Sinh
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {coursePrice.duration.toLocaleString("vi-VN")} Giờ Học
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>Tiếng Việt</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/images/avatar.png" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{data?.nguoiTao.hoTen}</p>
                    <p className="text-sm text-muted-foreground">
                      {data?.nguoiTao.tenLoaiNguoiDung}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <CourseEnrollmentCard
                courseId={data?.maKhoaHoc}
                price={coursePrice.promotionPrice.toLocaleString("vi-VN")}
                originalPrice={coursePrice.originalPrice.toLocaleString(
                  "vi-VN"
                )}
                discount={coursePrice.discountPercent.toLocaleString("vi-VN")}
                duration={randomDuration.toLocaleString("vi-VN")}
                studentCount={randomStudents.toLocaleString("vi-VN")}
                courseImage={data?.hinhAnh}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-4">Thông tin khóa học</h2>
                <div className="prose prose-gray max-w-none">{data?.moTa}</div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Yêu cầu</h3>
                <ul className="space-y-2">
                  <li>
                    Không yêu cầu kinh nghiệm lập trình - chúng ta sẽ bắt đầu
                    học từ những thứ cơ bản đến nâng cao
                  </li>
                  <li>Máy tính có kết nối mạng Internet</li>
                  <li>Tinh thần sẵn sàng tự học và luyện tập thường xuyên</li>
                  <li>
                    Kỹ năng máy tính cơ bản (quản lý thư mục, tìm kiếm tài liệu
                    từ nhiều nguồn,...)
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Sticky enrollment card is already positioned */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailPage;
