import { Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 pt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2">
              <img src="/images/logo.png" className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">CyberSoft</span>
            </a>
            <p className="text-muted-foreground text-pretty">
              Đào Tạo Chuyên Gia Lập Trình & Công Nghệ
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/lophocviet/" className="text-muted-foreground hover:text-primary" target="_blank">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/channel/UCWc3ASTJcb0FeO2oFfX8IDQ" className="text-muted-foreground hover:text-primary" target="_blank">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="font-semibold">Khóa học</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/courses/web-development" className="hover:text-primary">
                  Web Development
                </a>
              </li>
              <li>
                <a href="/courses/data-science" className="hover:text-primary">
                  Data Science
                </a>
              </li>
              <li>
                <a href="/courses/design" className="hover:text-primary">
                  Design
                </a>
              </li>
              <li>
                <a href="/courses/business" className="hover:text-primary">
                  Business
                </a>
              </li>
              <li>
                <a href="/courses/marketing" className="hover:text-primary">
                  Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Chi Nhánh</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-primary">
                  112 Cao Thắng, Quận 3
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-primary">
                  Tòa nhà Zeta, Tầng 1A, 15 Trần Khác Chân, Quận 1
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary">
                  P3-00.05 Chung cư Cityland Park Hills, Phường 10, Quận Gò Vấp
                </a>
              </li>
              <li>
                <a href="/press" className="hover:text-primary">
                  6C Đường số 8, Linh Tây, Thủ Đức (gần ĐH Cảnh Sát)
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary">
                  103 Nguyễn Hữu Dật, Hải Châu
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/help" className="hover:text-primary">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-primary">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/refund" className="hover:text-primary">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/accessibility" className="hover:text-primary">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 py-4 text-center text-muted-foreground">
          <p>&copy; Bản quyền CyberSoft 2017 - 2025 - Empower by CyberSoft</p>
        </div>
      </div>
    </footer>
  )
}
