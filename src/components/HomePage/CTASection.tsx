import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            Bắt đầu sự nghiệp lập trình từ ZERO tại CyberSoft
          </h2>
          <p className="text-xl text-primary-foreground/90 text-pretty">
            100% Thực Hành, Học Thật, Dự Án Thật, Việc Làm Thật
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8"
            >
              <a href="/DanhSachKhoaHoc">
                Danh sách khóa học
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <a href="/signup">Tư vấn miễn phí</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
