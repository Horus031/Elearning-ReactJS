import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { getCourseCategories, addCourse } from "@/services/course.api";

interface AddCourseModalProps {
  onClose: () => void;
}

export default function AddCourseModal({ onClose }: AddCourseModalProps) {
  const userJson = localStorage.getItem("user"); // ✅ lấy admin đang đăng nhập
  const currentUser = userJson ? JSON.parse(userJson) : null;

  const [formData, setFormData] = useState({
    maKhoaHoc: "",
    tenKhoaHoc: "",
    moTa: "",
    luotXem: "",
    danhGia: "",
    maNhom: "GP01",
    ngayTao: dayjs().format("YYYY-MM-DD"),
    maDanhMucKhoaHoc: "",
    taiKhoanNguoiTao: currentUser?.taiKhoan || "", // ✅ gán mặc định admin
  });

  const [hinhAnhFile, setHinhAnhFile] = useState<File | null>(null);
  const [hinhAnhPreview, setHinhAnhPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [danhMucList, setDanhMucList] = useState<any[]>([]);

  // ✅ Chỉ load danh mục (không load giáo viên nữa)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const danhMucRes = await getCourseCategories();
        setDanhMucList(danhMucRes.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải danh mục", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Validate từng field
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.maKhoaHoc.trim())
      newErrors.maKhoaHoc = "Mã khóa học không được để trống";
    if (!formData.tenKhoaHoc.trim())
      newErrors.tenKhoaHoc = "Tên khóa học không được để trống";
    if (!formData.maDanhMucKhoaHoc)
      newErrors.maDanhMucKhoaHoc = "Vui lòng chọn danh mục khóa học";
    if (!formData.taiKhoanNguoiTao)
      newErrors.taiKhoanNguoiTao = "Không tìm thấy người tạo";
    if (!formData.danhGia || Number(formData.danhGia) < 0)
      newErrors.danhGia = "Đánh giá không được để trống";
    if (!formData.luotXem || Number(formData.luotXem) < 0)
      newErrors.luotXem = "Lượt xem không được để trống";
    if (!formData.moTa.trim()) newErrors.moTa = "Vui lòng nhập mô tả";
    if (!hinhAnhFile) newErrors.hinhAnh = "Vui lòng chọn hình ảnh";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const newCourse = {
      maKhoaHoc: formData.maKhoaHoc,
      tenKhoaHoc: formData.tenKhoaHoc,
      moTa: formData.moTa,
      luotXem: Number(formData.luotXem),
      danhGia: Number(formData.danhGia),
      hinhAnh: hinhAnhFile?.name || "",
      maNhom: formData.maNhom,
      ngayTao: dayjs(formData.ngayTao).format("DD/MM/YYYY"),
      maDanhMucKhoaHoc: formData.maDanhMucKhoaHoc,
      taiKhoanNguoiTao: currentUser?.taiKhoan || "", // ✅ luôn gán admin
    };

    try {
      await addCourse(newCourse);
      Swal.fire("Thành công", "Thêm khóa học thành công!", "success");
      onClose();
    } catch (err) {
      console.error("❌ Lỗi thêm khóa học:", err);
      setErrors({ api: "Không thể thêm khóa học. Vui lòng thử lại." });
    }
  };

  // ✅ Khi chọn ảnh thì hiển thị preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setHinhAnhFile(file);
    if (file) {
      setHinhAnhPreview(URL.createObjectURL(file));
    } else {
      setHinhAnhPreview(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <h2 className="text-center text-2xl font-bold mb-6 uppercase">
          Thêm khóa học
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mã khóa học */}
            <div>
              <input
                type="text"
                placeholder="Mã khóa học"
                value={formData.maKhoaHoc}
                onChange={(e) =>
                  setFormData({ ...formData, maKhoaHoc: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
              {errors.maKhoaHoc && (
                <p className="text-red-500 text-sm mt-1">{errors.maKhoaHoc}</p>
              )}
            </div>

            {/* Tên khóa học */}
            <div>
              <input
                type="text"
                placeholder="Tên khóa học"
                value={formData.tenKhoaHoc}
                onChange={(e) =>
                  setFormData({ ...formData, tenKhoaHoc: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
              {errors.tenKhoaHoc && (
                <p className="text-red-500 text-sm mt-1">{errors.tenKhoaHoc}</p>
              )}
            </div>

            {/* Danh mục khóa học */}
            <div>
              <select
                value={formData.maDanhMucKhoaHoc}
                onChange={(e) =>
                  setFormData({ ...formData, maDanhMucKhoaHoc: e.target.value })
                }
                className="border rounded p-2 w-full"
              >
                <option value="">Danh mục khóa học</option>
                {danhMucList.map((dm) => (
                  <option key={dm.maDanhMuc} value={dm.maDanhMuc}>
                    {dm.tenDanhMuc}
                  </option>
                ))}
              </select>
              {errors.maDanhMucKhoaHoc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.maDanhMucKhoaHoc}
                </p>
              )}
            </div>

            {/* Ngày tạo */}
            <div>
              <input
                type="date"
                value={formData.ngayTao}
                onChange={(e) =>
                  setFormData({ ...formData, ngayTao: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
            </div>

            {/* Đánh giá */}
            <div>
              <input
                type="number"
                placeholder="Đánh giá từ 1-10"
                value={formData.danhGia}
                onChange={(e) =>
                  setFormData({ ...formData, danhGia: e.target.value })
                }
                min={1}
                max={10}
                className="border rounded p-2 w-full"
              />
              {errors.danhGia && (
                <p className="text-red-500 text-sm mt-1">{errors.danhGia}</p>
              )}
            </div>

            {/* Lượt xem */}
            <div>
              <input
                type="number"
                placeholder="Lượt xem"
                value={formData.luotXem}
                onChange={(e) =>
                  setFormData({ ...formData, luotXem: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
              {errors.luotXem && (
                <p className="text-red-500 text-sm mt-1">{errors.luotXem}</p>
              )}
            </div>

            {/* Người tạo - hiển thị readonly */}
            <div>
              <input
                type="text"
                value={currentUser?.taiKhoan || ""}
                disabled
                className="border rounded p-2 w-full bg-gray-100"
              />
              {errors.taiKhoanNguoiTao && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.taiKhoanNguoiTao}
                </p>
              )}
            </div>

            {/* Mã nhóm */}
            <div>
              <select
                value={formData.maNhom}
                onChange={(e) =>
                  setFormData({ ...formData, maNhom: e.target.value })
                }
                className="border rounded p-2 w-full"
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

            {/* Hình ảnh */}
            <div className="col-span-2">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="border rounded p-2 w-full"
              />
              {errors.hinhAnh && (
                <p className="text-red-500 text-sm mt-1">{errors.hinhAnh}</p>
              )}

              {hinhAnhPreview && (
                <div className="mt-3 flex justify-center">
                  <img
                    src={hinhAnhPreview}
                    alt="preview"
                    className="w-40 h-28 object-cover rounded shadow"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mô tả */}
          <div className="mt-4">
            <label className="block font-medium mb-1">Mô tả khóa học</label>
            <textarea
              placeholder="Nhập mô tả"
              value={formData.moTa}
              onChange={(e) =>
                setFormData({ ...formData, moTa: e.target.value })
              }
              className="border rounded p-2 w-full resize-none"
              rows={3}
            />
            {errors.moTa && (
              <p className="text-red-500 text-sm mt-1">{errors.moTa}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Thêm khóa học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
