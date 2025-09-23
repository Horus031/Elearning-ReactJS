import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Globe, File, MessageSquare, BellRing } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Hệ thống học tập",
    description: "CyberSoft sử dụng hệ thống video trực tuyến và hệ thống LMS ( Learning Management System) hiện đại để hỗ trợ học tập cho các khóa học.",
  },
  {
    icon: Users,
    title: "Giảng viên - Mentor hỗ trợ",
    description: "Trong suốt khóa học, học viên được hỗ trợ nhiệt tình từ các giảng viên và các mentor. Giảng viên chia sẻ tất cả các kinh nghiệm có được từ các dự án giảng viên đang làm. Mentor tích cực đôn đốc việc code, hỗ trợ sửa lỗi code và góp ý code đúng chuẩn.",
  },
  {
    icon: File,
    title: "Dự án - bài tập thực tế",
    description: "Hệ thống bài tập - dự án thực tế được áp dụng vào từng buổi học. Ngay sau buổi học, học viên đã có thể code các phần của dự án, bài luyện tập chuyên sâu.",
  },
  {
    icon: MessageSquare,
    title: "Nhóm thảo luận - tương tác",
    description: "Ngoài giờ học tại lớp, học viên còn được hỗ trợ tích cực từ Giảng viên, Mentor và các bạn cùng lớp trên kênh thảo luận và kênh chat cực kì sôi nổi. Bạn luôn có được động lực học tập cao nhất từ các nhóm thảo luận này.",
  },
  {
    icon: Globe,
    title: "Hệ thống hỗ trợ việc làm",
    description: "Ngay từ khi bắt đầu học, học viên sẽ được hỗ trợ kết nối với hệ thống việc làm. Hệ thống sẽ hỗ trợ đánh giá kỹ năng, tạo CV tự động, truy cập trọn đời. Khi kết thúc khoá học sẽ được hướng dẫn kỹ năng phỏng vấn và kết nối với các doanh nghiệp.",
  },
  {
    icon: BellRing,
    title: "Hệ thống theo dõi học tập thông minh",
    description: "Hệ thống ứng dụng công nghệ AI, giúp tự động nhắc nhở các hạn nộp bài tập, xem lại code và video bài học. Ngoài ra, mỗi lớp sẽ có một chủ nhiệm thường xuyên theo sát tiến độ học tập giúp học viên dễ dàng xây dựng thói quen học lập trình.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">Điểm ưu việt chỉ có tại Cybersoft</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Chúng tôi cung cấp mọi thứ bạn cần để thành công trong hành trình học tập, từ hướng dẫn chuyên môn đến hỗ trợ nghề nghiệp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
