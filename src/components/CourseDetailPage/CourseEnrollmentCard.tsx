import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseEnrollmentCardProps {
  courseId: string | undefined;
  price: string;
  originalPrice?: string;
  discount: string;
  duration: string;
  studentCount: string;
  courseImage: string | undefined;
  isEnrolled?: boolean;
}

export function CourseEnrollmentCard({
  courseId,
  price,
  originalPrice,
  duration,
  studentCount,
  discount,
  courseImage,
  isEnrolled = false,
}: CourseEnrollmentCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="sticky top-24">
      <CardHeader className="text-center">
        <div className="relative">
          <img
            src={courseImage}
            alt="Course preview"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-primary">${price}</span>
            {originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${originalPrice}
                </span>
                <Badge variant="secondary">{discount}% OFF</Badge>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration} giờ học</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{studentCount.toLocaleString()} học sinh đã đăng ký</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Khóa học bao gồm:</h4>
          <ul className="space-y-2">
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
              <span>Hỗ trợ từ giảng viện, trở giảng và cộng đồng Cybersoft</span>
            </li>
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        {isEnrolled ? (
          <Button size="lg" className="w-full">
            Continue Learning
          </Button>
        ) : (
          <>
            <Button
              onClick={() => navigate(`/XacNhanKhoaHoc/${courseId}`)}
              size="lg"
              className="w-full"
            >
              Enroll Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent"
            >
              Add to Wishlist
            </Button>
          </>
        )}
        <p className="text-xs text-center text-muted-foreground">
          30-day money-back guarantee
        </p>
      </CardFooter>
    </Card>
  );
}
