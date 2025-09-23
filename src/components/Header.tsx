import { Button } from "@/components/ui/button";
import { getCourseCategory } from "@/services/course.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownCircleIcon, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { useAuthStore } from "@/store/auth.store";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const { user, clearUser } = useAuthStore();

  const { data = [] } = useQuery({
    queryKey: ["course-category"],
    queryFn: () => getCourseCategory(),
  });

  const renderCourseCategory = () => {
    return data.map((course) => {
      return (
        <DropdownMenuItem
          onClick={() => navigate(`/DanhMucKhoaHoc?maDanhMuc=${course.maDanhMuc}&MaNhom=GP02`)}
          key={course.maDanhMuc}
          className="bg-white w-full p-2 font-semibold cursor-pointer"
        >
          {course.tenDanhMuc}
        </DropdownMenuItem>
      );
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lấy giá trị từ input
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      if (inputValue.trim()) {
        navigate(`/TimKiemKhoaHoc?tenKhoaHoc=${inputValue.trim()}`)
      }
    }
  };
  

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white backdrop-blur">
      <div className="flex container mx-auto h-16 items-center justify-between px-4">
        <div className="flex lg:gap-8 items-center">
          <a href="/" className="flex flex-1 items-center space-x-2">
            <img src="/images/logo.png" className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary hidden lg:block">
              Cybersoft
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="font-bold text-foreground hover:text-primary transition-colors cursor-pointer text-nowrap flex gap-4 border p-2 rounded-lg border-black/50">
                  Khóa học <ChevronDownCircleIcon />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-52 bg-white border shadow-2xl/20 rounded-b-lg"
                align="start"
              >
                <DropdownMenuGroup>{renderCourseCategory()}</DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center gap-2 text-lg">
          <Input ref={inputRef} placeholder="Tìm kiếm khóa học..." className="text-lg" />
          <Button type="submit" variant="outline">
            Tìm kiếm
          </Button>
        </form>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="border border-black cursor-pointer active:scale-90">
                    <AvatarImage src="/images/avatar.png" alt="avatar" />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-52 bg-white border shadow-2xl/20 rounded-lg mt-2"
                  align="end"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="bg-white w-full p-2 font-semibold cursor-pointer">
                      Hồ sơ cá nhân
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearUser} className="bg-white w-full p-2 font-semibold cursor-pointer text-red-500">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <a href="/auth/login">Sign In</a>
              </Button>
              <Button asChild>
                <a href="/auth/register">Get Started</a>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container px-4 py-4 space-y-4">
            <a
              href="/courses"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </a>
            <a
              href="/about"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/contact"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" asChild>
                <a href="/login">Sign In</a>
              </Button>
              <Button asChild>
                <a href="/signup">Get Started</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
