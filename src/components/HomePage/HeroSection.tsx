import { Button } from "@/components/ui/button";
import {  Users, Award } from "lucide-react";
import { NavLink } from "react-router-dom";

export function HeroSection() {

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-amber-400">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-background" />

      <div className="container mx-auto relative px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Khởi Đầu
                <span className="text-primary block">Sự Nghiệp Của Bạn</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                Trở thành lập trình viên chuyên nghiệp tại Cybersoft
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8">
                <NavLink to="/DanhSachKhoaHoc">Xem khóa học</NavLink>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">7</div>
                <div className="text-sm text-muted-foreground">Trung tâm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">9500+</div>
                <div className="text-sm text-muted-foreground">Học viên</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Đối tác</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
              <img
                src="/images/heroimg.jpg"
                alt="Online learning illustration"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Live Classes</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Certificates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
