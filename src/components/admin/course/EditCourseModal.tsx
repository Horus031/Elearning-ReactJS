import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateCourse, getCourseCategories } from "@/services/course.api";
import { getUsers } from "@/services/user.api";
import { uploadCourseImage } from "@/services/course.api";

import Swal from "sweetalert2";
import dayjs from "dayjs";

interface EditCourseModalProps {
  course: any;
  onClose: () => void;
}

export default function EditCourseModal({
  course,
  onClose,
}: EditCourseModalProps) {
  const [tenKhoaHoc, setTenKhoaHoc] = useState(course.tenKhoaHoc || "");
  const [moTa, setMoTa] = useState(course.moTa || "");
  const [luotXem, setLuotXem] = useState(course.luotXem || 0);
  const [danhGia, setDanhGia] = useState(course.danhGia || 0);
  const [maNhom, setMaNhom] = useState(course.maNhom || "GP01");
  const [ngayTao, setNgayTao] = useState(
    course.ngayTao
      ? dayjs(course.ngayTao, "DD/MM/YYYY").format("YYYY-MM-DD")
      : ""
  );
  const [maDanhMucKhoaHoc, setMaDanhMucKhoaHoc] = useState(
    course.maDanhMucKhoaHoc || ""
  );
  const [taiKhoanNguoiTao, setTaiKhoanNguoiTao] = useState(
    course.taiKhoanNguoiTao || ""
  );
  const [hinhAnhFile, setHinhAnhFile] = useState<File | null>(null);

  const [danhMucList, setDanhMucList] = useState<any[]>([]);
  const [giaoVienList, setGiaoVienList] = useState<any[]>([]);

  // ✅ Giữ nguyên logic cũ, chỉ đảm bảo lọc đúng người dùng có maLoaiNguoiDung = "GV"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dm, users] = await Promise.all([
          getCourseCategories(),
          getUsers("GP01"),
        ]);
        setDanhMucList(dm.data);
        // ✅ chỉ lấy giáo viên (GV)
        const teacherList = users.data.filter(
          (u: any) => u.maLoaiNguoiDung === "GV"
        );
        setGiaoVienList(teacherList);
      } catch (err) {
        console.error("Lỗi tải danh mục / giáo viên", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      // Tạo payload khóa học
      const payload = {
        maKhoaHoc: course.maKhoaHoc,
        tenKhoaHoc,
        moTa,
        luotXem: Number(luotXem),
        danhGia: Number(danhGia),
        hinhAnh: hinhAnhFile?.name || course.hinhAnh,
        maNhom,
        ngayTao: dayjs(ngayTao).format("DD/MM/YYYY"),
        maDanhMucKhoaHoc,
        taiKhoanNguoiTao: String(taiKhoanNguoiTao), // ✅ Chọn giáo viên từ dropdown
      };

      // 1. Cập nhật thông tin khóa học trước
      await updateCourse(payload);
      Swal.fire("Thành công", "Cập nhật khoá học thành công!", "success");

      // 2. Nếu có file hình ảnh, upload hình ảnh
      if (hinhAnhFile) {
        const formData = new FormData();
        formData.append("file", hinhAnhFile);
        formData.append("tenKhoaHoc", tenKhoaHoc);

        await uploadCourseImage(formData); // Phương thức upload hình ảnh
        Swal.fire(
          "Thành công",
          "Hình ảnh khoá học đã được cập nhật!",
          "success"
        );
      }

      // Đóng modal sau khi hoàn thành
      onClose();
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      Swal.fire("Lỗi", "Không thể cập nhật khoá học", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Cập nhật khoá học</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Mã khoá học</label>
            <Input value={course.maKhoaHoc} disabled />
          </div>

          <div>
            <label className="text-sm font-medium">Tên khoá học</label>
            <Input
              value={tenKhoaHoc}
              onChange={(e) => setTenKhoaHoc(e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Mô tả</label>
            <textarea
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              className="w-full border rounded p-2"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Lượt xem</label>
            <Input
              type="number"
              value={luotXem}
              onChange={(e) => setLuotXem(+e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Đánh giá</label>
            <Input
              type="number"
              min={1}
              max={10}
              value={danhGia}
              onChange={(e) => setDanhGia(+e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mã nhóm</label>
            <select
              value={maNhom}
              onChange={(e) => setMaNhom(e.target.value)}
              className="w-full border rounded p-2"
            >
              {Array.from({ length: 15 }, (_, i) => (
                <option
                  key={i}
                  value={`GP${(i + 1).toString().padStart(2, "0")}`}
                >
                  GP{(i + 1).toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Ngày tạo</label>
            <Input
              type="date"
              value={ngayTao}
              onChange={(e) => setNgayTao(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Danh mục khoá học</label>
            <select
              value={maDanhMucKhoaHoc}
              onChange={(e) => setMaDanhMucKhoaHoc(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">-- Chọn danh mục --</option>
              {danhMucList.map((dm) => (
                <option key={dm.maDanhMuc} value={dm.maDanhMuc}>
                  {dm.tenDanhMuc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Người tạo (Giáo viên)</label>
            <select
              value={taiKhoanNguoiTao}
              onChange={(e) => setTaiKhoanNguoiTao(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">-- Chọn giáo viên --</option>
              {giaoVienList.map((g) => (
                <option key={g.taiKhoan} value={g.taiKhoan}>
                  {g.hoTen} ({g.taiKhoan})
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Chọn ảnh khoá học</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setHinhAnhFile(e.target.files?.[0] || null)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button className="bg-gray-400" onClick={onClose}>
            Huỷ
          </Button>
          <Button className="bg-blue-500" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </div>
      </div>
    </div>
  );
}
