import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { enrollCourse, getCourseDetails } from "@/services/course.api";
import { useAuthStore } from "@/store/auth.store";
import { generateCoursePrice, getRandomDuration, getRandomStudent } from "@/utils/generateCoursePrice";
import { Avatar } from "@radix-ui/react-avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft, Clock, CreditCard, Shield, Users } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const ConfirmationPage = () => {
  const { maKhoaHoc } = useParams<{ maKhoaHoc: string }>();
  const { user } = useAuthStore();
  const randomDuration = getRandomDuration()
  const randomStudents = getRandomStudent()
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const { mutate: handleEnroll } = useMutation({
    mutationFn: () =>
      enrollCourse({
        maKhoaHoc: maKhoaHoc,
        taiKhoan: user?.taiKhoan,
      }),
    onSuccess: (response) => {
      setIsProcessing(false);

      alert(`${response}. Hãy kiểm tra khóa học của bạn trong phần hồ sơ`);
      navigate("/");
    },
    onError: (error) => {
      setIsProcessing(false);

      console.log("Something went wrong", error);
    },
  });

  const handleEnrollment = async () => {
    setIsProcessing(true);

    handleEnroll();
  };

  const { data } = useQuery({
    queryKey: ["course-confirm"],
    queryFn: () => getCourseDetails(maKhoaHoc),
  });

  const coursePrices = generateCoursePrice();

  return (
    <div className="container px-4 max-w-4xl mx-auto py-24 bg-card">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <NavLink
            to={`/ChiTietKhoaHoc/${maKhoaHoc}`}
            className="hover:text-primary flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Course
          </NavLink>
          <span>/</span>
          <span>Enrollment Confirmation</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Course Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Xác nhận đăng ký khóa học
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <img
                  src={data?.hinhAnh}
                  alt={data?.tenKhoaHoc}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{data?.tenKhoaHoc}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/images/avatar.png" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      by {data?.nguoiTao.hoTen}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {randomDuration.toLocaleString("vi-VN")} giờ học
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {randomStudents.toLocaleString("vi-VN")} học sinh
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Khóa học bao gồm:</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2 text-sm">
                    <span>Chứng chỉ hoàn thành khóa học</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span>Tài liệu chất lượng có thể tải về</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span>Bài tập cơ bản - nâng cao trong khóa học</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span>
                      Hỗ trợ từ giảng viện, trở giảng và cộng đồng Cybersoft
                    </span>
                  </li>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Shield className="h-4 w-4" />
                  <span>Bảo hành hoàn tiền 30 ngày</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Không vừa ý hay có bất kỳ vấn đề nào ? Nhận hoàn tiền đầy đủ
                  trong 30 ngày, không có điều kiện
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Đơn hàng của bạn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Giá khóa học</span>
                  <span className="line-through text-muted-foreground">
                    {coursePrices.originalPrice.toLocaleString("vi-VN")}VNĐ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Giảm giá ({coursePrices.discountPercent}%)</span>
                  <span className="text-green-600">
                    -
                    {(
                      coursePrices.originalPrice! - coursePrices.promotionPrice
                    ).toLocaleString("vi-VN")}
                    VNĐ
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary">
                    {coursePrices.promotionPrice.toLocaleString("vi-VN")}VNĐ
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleEnrollment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Xác nhận đăng ký"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                  disabled={isProcessing}
                >
                  <NavLink to={`/ChiTietKhoaHoc/${maKhoaHoc}`}>Hủy</NavLink>
                </Button>
              </div>

              <div className="text-xs text-center text-muted-foreground space-y-1">
                <p>
                  Bằng cách hoàn tất đăng ký, bạn đồng ý với Điều khoản dịch vụ
                  và Chính sách bảo mật của chúng tôi.
                </p>
                <p>
                  Xử lý thanh toán an toàn nhờ mã hóa theo tiêu chuẩn công
                  nghiệp.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
