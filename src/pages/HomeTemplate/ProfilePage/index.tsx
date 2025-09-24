import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cancelEnrolledCourse } from "@/services/course.api";
import { getInformation, updateUserInfo } from "@/services/user.api";
import { useAuthStore } from "@/store/auth.store";
import type { UpdateDataRequest } from "@/types/auth";
import type { EnrollmentDataRequest } from "@/types/course";
import type { User, UserInfor } from "@/types/user";
import { getRandomDuration, getRandomStudent } from "@/utils/generateCoursePrice";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { Clock, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [currentTabs, setCurrentTabs] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserInfor>();
  const [userValues, setUserValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const randomDuration = getRandomDuration();
  const randomStudents = getRandomStudent();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  });

  const { mutate: handleUserInfo } = useMutation({
    mutationFn: () => getInformation(),
    onSuccess: (userInfo) => {
      if (!userInfo) return;

      setCurrentUser(userInfo);
      setUserValues({
        taiKhoan: userInfo.taiKhoan,
        matKhau: userInfo.matKhau,
        email: userInfo.email,
        soDT: userInfo.soDT || "",
        maNhom: userInfo.maNhom,
        maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
        hoTen: userInfo.hoTen,
      });
    },
  });

  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: (data: UpdateDataRequest) => updateUserInfo(data),
    onSuccess: (userInfor: UserInfor) => {
      if (!userInfor) return;

      setUser({
        taiKhoan: userInfor.taiKhoan,
        hoTen: userInfor.hoTen,
        email: userInfor.email,
        soDT: userInfor.soDT,
        maLoaiNguoiDung: userInfor.maLoaiNguoiDung,
        maNhom: userInfor.maNhom,
        accessToken: user?.accessToken || "",
      } as User);

      setUserValues({
        taiKhoan: userInfor.taiKhoan,
        matKhau: userInfor.matKhau,
        email: userInfor.email,
        soDT: userInfor.soDT || "",
        maNhom: userInfor.maNhom,
        maLoaiNguoiDung: userInfor.maLoaiNguoiDung,
        hoTen: userInfor.hoTen,
      });

      handleUserInfo();

      console.log("Update information successfully");
    },
    onError: () => {
      console.log("Update information failed");
    },
  });

  const { mutate: handleCancelCourse } = useMutation({
    mutationFn: (data: EnrollmentDataRequest) => cancelEnrolledCourse(data),
    onSuccess: (response) => {
      alert(`${response}`);

      handleUserInfo();
    },
    onError: (error) => {
      console.log("Xóa thất bại", error);
    },
  });

  useEffect(() => {
    handleUserInfo();
  }, [handleUserInfo]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserValues({
      ...userValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleUpdateUser(userValues);
    setIsEditing(false);
  };

  const handleRenderCourses = () => {
    return currentUser?.chiTietKhoaHocGhiDanh.map((item) => {
      return (
        <div key={item.maKhoaHoc} className="rounded-lg p-2 border">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                <img
                  src={item.hinhAnh}
                  alt=""
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col space-y-4 items-start justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold  mb-2">
                      {item.tenKhoaHoc}
                    </h3>
                    <p>{item.moTa}</p>

                    <div className="space-y-3 flex items-center justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {randomDuration.toLocaleString("vi-VN")} giờ học
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {randomStudents.toLocaleString("vi-VN")} học sinh đã
                            đăng ký
                          </span>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger>
                          <span className="bg-red-500 text-white font-medium p-2 px-4 rounded-lg cursor-pointer">
                            Hủy đăng ký
                          </span>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Hủy đăng ký khóa học</DialogTitle> 
                            <DialogDescription>
                              Bạn có chắc chắn muốn hủy khóa học không ?
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <DialogClose>
                              <span className="font-medium p-2 px-4 border rounded-lg cursor-pointer">
                                Không
                              </span>
                            </DialogClose>
                            <span
                              onClick={() =>
                                handleCancelCourse({
                                  maKhoaHoc: item.maKhoaHoc,
                                  taiKhoan: user?.taiKhoan,
                                })
                              }
                              className="bg-red-500 text-white font-medium p-2 px-4 rounded-lg cursor-pointer"
                            >
                              Có
                            </span>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="bg-gray-200 rounded-lg text-sm p-1 text-center font-medium w-fit">
            <button
              onClick={() => setCurrentTabs("profile")}
              className={`rounded-md p-2 cursor-pointer ${
                currentTabs === "profile" ? "bg-amber-400" : ""
              }`}
            >
              Hồ sơ
            </button>
            <button
              onClick={() => setCurrentTabs("booking")}
              className={`rounded-md p-2 cursor-pointer ${
                currentTabs === "booking" ? "bg-amber-400" : ""
              }`}
            >
              Khóa học của tôi
            </button>
          </div>

          <div>
            <div className="shadow-2xl/30 border  border-black rounded-lg p-4">
              {currentTabs === "profile" ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src="/images/avatar.png"
                        alt=""
                        className="size-20"
                      />
                      <div className="">
                        <h3 className="text-2xl font-medium">
                          {currentUser?.hoTen}
                        </h3>
                        <p className="">Thành viên của Cybersoft</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {!isEditing && (
                        <div className="col-span-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 font-medium rounded-lg"
                          >
                            Cập nhật hồ sơ
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <form
                      onSubmit={handleOnSubmit}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                    >
                      {isEditing && (
                        <div className="col-span-2 flex justify-end space-x-4">
                          <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-800 px-4 py-2 font-medium rounded-lg"
                          >
                            Lưu
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-600 border bg-transparent px-4 py-2 font-medium rounded-lg"
                          >
                            Hủy
                          </button>
                        </div>
                      )}
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="hoTen"
                            className="flex items-center mb-2"
                          >
                            Họ tên
                          </label>
                          {isEditing ? (
                            <input
                              onChange={handleOnChange}
                              type="text"
                              name="hoTen"
                              id="hoTen"
                              className="w-full rounded-lg "
                              value={userValues?.hoTen}
                            />
                          ) : (
                            <p className="p-3 rounded-md border border-black">
                              {currentUser?.hoTen}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="soDT"
                            className="flex items-center mb-2"
                          >
                            Số điện thoại
                          </label>
                          {isEditing ? (
                            <input
                              onChange={handleOnChange}
                              type="text"
                              name="soDT"
                              id="soDT"
                              className="w-full rounded-lg "
                              value={userValues.soDT}
                            />
                          ) : (
                            <p className="p-3 rounded-md border-black border">
                              {currentUser?.soDT}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="flex items-center mb-2"
                          >
                            Email
                          </label>
                          {isEditing ? (
                            <input
                              onChange={handleOnChange}
                              type="text"
                              name="email"
                              id="email"
                              className="w-full rounded-lg "
                              value={userValues?.email}
                            />
                          ) : (
                            <p className=" p-3 rounded-md border border-black">
                              {currentUser?.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="matKhau"
                            className="flex items-center mb-2"
                          >
                            Mật khẩu
                          </label>
                          {isEditing ? (
                            <input
                              onChange={handleOnChange}
                              type="text"
                              name="matKhau"
                              id="matKhau"
                              className="w-full rounded-lg "
                              value={userValues?.matKhau}
                            />
                          ) : (
                            <p className="p-3 rounded-md border border-black">
                              {currentUser?.matKhau}
                            </p>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold ">
                      Danh sách khóa học của bạn
                    </h3>
                    <Badge>
                      Tổng cộng {currentUser?.chiTietKhoaHocGhiDanh.length} khóa
                      học
                    </Badge>
                  </div>

                  <div className="grid gap-6">{handleRenderCourses()}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
